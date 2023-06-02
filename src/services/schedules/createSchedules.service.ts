import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../error";
import { Tschedule } from "../../interfaces/shedule";

const createScheduleService = async (
  body: Tschedule,
  id: number
): Promise<Schedule> => {
  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const idEstate = body.realEstateId;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const date = body.date;

  const hour = body.hour;

  const estate = await realEstateRepository.findOne({
    where: {
      id: idEstate,
    },
  });

  if (!estate) {
    throw new AppError("RealEstate not found", 404);
  }

  const findUser = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  const userSchedule = await schedulesRepository
    .createQueryBuilder("schedule")
    .where("schedule.userId = :userId", { userId: id })
    .andWhere("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .getOne();

  if (userSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const verifyIfScheduleExist = await schedulesRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date AND schedule.hour = :hour", { date, hour })
    .getOne();

  if (verifyIfScheduleExist) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const openingHour: number = 8;
  const closingHour: number = 18;

  const scheduleHour = parseInt(hour.split(":")[0]);
  if (scheduleHour < openingHour || scheduleHour >= closingHour) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const weekday = new Date(date).getDay();
  if (weekday === 0 || weekday === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const schedule = {
    date,
    hour,
    realEstate: estate!,
    user: findUser!,
  };

  const returnSchedule: Schedule = schedulesRepository.create(schedule);

  await schedulesRepository.save(returnSchedule);

  return returnSchedule;
};

export { createScheduleService };

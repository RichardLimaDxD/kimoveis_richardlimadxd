import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const getSchedulesService = async (id: number): Promise<RealEstate> => {
  const schedulesRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const FindSchedule = await schedulesRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      schedules: { user: true },
      address: true,
      category: true,
    },
  });

  if (!FindSchedule) {
    throw new AppError("RealEstate not found", 404);
  }

  return FindSchedule;
};

export { getSchedulesService };

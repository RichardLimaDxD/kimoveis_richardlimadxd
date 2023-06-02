import { Request, Response } from "express";
import { createScheduleService } from "../services/schedules/createSchedules.service";
import { getSchedulesService } from "../services/schedules/getSchedules.service";
import { Tschedule } from "../interfaces/shedule";

const createScheduleController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = parseInt(response.locals.id);
  const body: Tschedule = request.body;

  await createScheduleService(body, id);

  return response.status(201).json({ message: "Schedule created" });
};

const getSchedulesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = parseInt(request.params.id);

  const schedules = await getSchedulesService(id);

  return response.json(schedules);
};

export { createScheduleController, getSchedulesController };

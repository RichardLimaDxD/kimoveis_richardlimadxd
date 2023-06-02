import { Router } from "express";
import {
  validatedTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
} from "../middlewares/verify.middleware";
import {
  createScheduleController,
  getSchedulesController,
} from "../controllers/schedules.controller";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { scheduleSchema } from "../schemas/schedulesSchema";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  validatedTokenMiddleware,
  validateBodyMiddleware(scheduleSchema),
  createScheduleController
);

schedulesRoutes.get(
  "/realEstate/:id",
  validatedTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
  getSchedulesController
);

export { schedulesRoutes };

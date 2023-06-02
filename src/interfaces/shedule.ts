import { z } from "zod";
import {
  reponseScheduleSchema,
  responseArrayScheduleSchema,
  scheduleSchema,
} from "../schemas/schedulesSchema";

type Tschedule = z.infer<typeof scheduleSchema>;

type TscheduleResponse = z.infer<typeof reponseScheduleSchema>;

type TarraySchedule = z.infer<typeof responseArrayScheduleSchema>;

export { Tschedule, TscheduleResponse, TarraySchedule };

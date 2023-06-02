import { z } from "zod";

const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
});

const reponseScheduleSchema = scheduleSchema.extend({
  id: z.number().int(),
  userId: z.number().int(),
});

const responseArrayScheduleSchema = reponseScheduleSchema.array();

export { scheduleSchema, reponseScheduleSchema, responseArrayScheduleSchema };

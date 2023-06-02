import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
});

const requestCategorySchema = categorySchema.extend({
  id: z.number().int(),
});

const getCategoriesSchema = requestCategorySchema.array();

export { categorySchema, requestCategorySchema, getCategoriesSchema };

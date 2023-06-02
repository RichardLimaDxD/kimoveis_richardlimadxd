import { z } from "zod";
import { addressSchema, responseAddressSchema } from "./addressSchema";
import { requestCategorySchema } from "./categorySchema";

const realEstateSchema = z.object({
  value: z.string().or(z.number()),
  size: z.number().int().positive(),
  address: addressSchema,
  categoryId: z.number(),
});

const returnRealEstateSchema = realEstateSchema
  .omit({ categoryId: true })
  .extend({
    id: z.number(),
    updatedAt: z.date().or(z.string()),
    createdAt: z.date().or(z.string()),
    category: requestCategorySchema,
    address: responseAddressSchema,
    sold: z.boolean().default(false),
  });

const returnAllRealEstateSchema = returnRealEstateSchema.array();

export { realEstateSchema, returnRealEstateSchema, returnAllRealEstateSchema };

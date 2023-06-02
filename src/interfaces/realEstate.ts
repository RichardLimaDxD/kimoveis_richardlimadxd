import { z } from "zod";
import {
  realEstateSchema,
  returnAllRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstateSchema";

type TRealEstate = z.infer<typeof realEstateSchema>;

type TRequestRealEstate = z.infer<typeof returnRealEstateSchema>;

type TGetRealEstate = z.infer<typeof returnAllRealEstateSchema>;

export { TRealEstate, TRequestRealEstate, TGetRealEstate };

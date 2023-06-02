import { Router } from "express";
import {
  compareIdAndTokenMiddleware,
  nameCategoryMiddleware,
  validatedTokenMiddleware,
} from "../middlewares/verify.middleware";
import {
  createEstateController,
  getEstateController,
} from "../controllers/realEstate.controllers";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { realEstateSchema } from "../schemas/realEstateSchema";

const realEstateRouters: Router = Router();

realEstateRouters.post(
  "",
  validatedTokenMiddleware,
  compareIdAndTokenMiddleware,
  validateBodyMiddleware(realEstateSchema),
  nameCategoryMiddleware,
  createEstateController
);

realEstateRouters.get("", getEstateController);

export { realEstateRouters };

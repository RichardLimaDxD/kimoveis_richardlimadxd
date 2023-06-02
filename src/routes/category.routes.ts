import { Router } from "express";
import {
  createCategoryControlller,
  getCategoryController,
  getCategoryRealEstateController,
} from "../controllers/category.controller";
import {
  nameCategoryMiddleware,
  validatedTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
} from "../middlewares/verify.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { categorySchema } from "../schemas/categorySchema";

const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  validatedTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
  validateBodyMiddleware(categorySchema),
  nameCategoryMiddleware,
  createCategoryControlller
);

categoryRoutes.get("", getCategoryController);

categoryRoutes.get(
  "/:id/realEstate",
  nameCategoryMiddleware,
  getCategoryRealEstateController
);

export { categoryRoutes };

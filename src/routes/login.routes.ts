import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { loginSchema } from "../schemas/loginSchema";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validateBodyMiddleware(loginSchema),
  createLoginController
);

export { loginRoutes };

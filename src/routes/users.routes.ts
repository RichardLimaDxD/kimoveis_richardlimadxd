import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  editUserController,
  getUsersController,
} from "../controllers/users.controller";
import { editSchemaUser, userSchema } from "../schemas/usersSchema";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import {
  compareIdAndTokenMiddleware,
  emailExistsMiddleware,
  idExistsMiddleware,
  validatedTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
} from "../middlewares/verify.middleware";

const usersRouters: Router = Router();

usersRouters.post(
  "",
  validateBodyMiddleware(userSchema),
  emailExistsMiddleware,
  createUsersController
);

usersRouters.get(
  "",
  validatedTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
  getUsersController
);

usersRouters.patch(
  "/:id",
  validatedTokenMiddleware,
  idExistsMiddleware,
  compareIdAndTokenMiddleware,
  validateBodyMiddleware(editSchemaUser),
  emailExistsMiddleware,
  editUserController
);

usersRouters.delete(
  "/:id",
  validatedTokenMiddleware,
  idExistsMiddleware,
  verifyIfUserIsAdminMiddleware,
  deleteUserController
);

export { usersRouters };

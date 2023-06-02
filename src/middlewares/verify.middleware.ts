import { NextFunction, Request, Response } from "express";
import { Category, User } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";
import "dotenv/config";

const emailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { email }: { email: string } = request.body;
  if (email === undefined) return next();

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (user?.email !== undefined) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

const idExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const id: number = parseInt(request.params.id);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (user?.id === undefined) {
    throw new AppError("User not found", 404);
  }

  return next();
};

const validatedTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authentic: string | undefined = request.headers.authorization;

  if (authentic === undefined) {
    throw new AppError("Missing bearer token", 401);
  }

  const [_bearer, token] = authentic.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    response.locals.id = decoded.sub;
    response.locals.admin = decoded.admin;
  });

  return next();
};

const compareIdAndTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(response.locals.id);
  const idParams: number = parseInt(request.params.id);

  const admin: boolean = response.locals.admin;

  if (id === idParams || admin) {
    return next();
  }
  throw new AppError("Insufficient permission", 403);
};

const verifyIfUserIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin: boolean = response.locals.admin;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

const nameCategoryMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name }: { name: string } = request.body;

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  if (name) {
    const verifyCategoryName = await categoryRepository.findOneBy({
      name: name,
    });

    if (verifyCategoryName) {
      throw new AppError("Category already exists", 409);
    }
  }

  return next();
};

export {
  emailExistsMiddleware,
  idExistsMiddleware,
  validatedTokenMiddleware,
  compareIdAndTokenMiddleware,
  verifyIfUserIsAdminMiddleware,
  nameCategoryMiddleware,
};

import "dotenv/config";
import { compare } from "bcryptjs";
import User from "../../entities/users.entity";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { TloginRequest } from "../../interfaces/login";
import { Repository } from "typeorm";

const createLoginService = async (
  loginData: TloginRequest
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordCompare: boolean = await compare(
    loginData.password,
    user.password
  );

  if (!passwordCompare) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    { admin: user.admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};

export { createLoginService };

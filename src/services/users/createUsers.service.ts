import { Repository } from "typeorm";
import User from "../../entities/users.entity";
import { TuserPasswordRequest, Tusers } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { returnSchemaPassword } from "../../schemas/usersSchema";

const createUsersService = async (
  dataUser: Tusers
): Promise<TuserPasswordRequest> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(dataUser);

  await userRepository.save(user);

  const returnUser: TuserPasswordRequest = returnSchemaPassword.parse(user);

  return returnUser;
};

export { createUsersService };

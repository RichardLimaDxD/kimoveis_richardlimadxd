import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { getUsersSchema } from "../../schemas/usersSchema";
import { TarrayUsers } from "../../interfaces/users";

const getUsersService = async (): Promise<TarrayUsers> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const getUser: User[] = await userRepository.find({ withDeleted: true });

  const userReturn: TarrayUsers = getUsersSchema.parse(getUser);

  return userReturn;
};

export { getUsersService };

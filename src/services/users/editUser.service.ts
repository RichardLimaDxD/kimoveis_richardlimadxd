import { Repository } from "typeorm";
import { TeditUser, TuserPasswordRequest } from "../../interfaces/users";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnSchemaPassword } from "../../schemas/usersSchema";

const editUserService = async (
  data: TeditUser,
  id: number
): Promise<TuserPasswordRequest> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldData: User | null = await userRepository.findOneBy({
    id: id,
  });

  const { admin, ...userDataId } = data;

  const user = userRepository.create({
    ...oldData,
    ...userDataId,
  });

  await userRepository.save(user);

  const returnEditUser: TuserPasswordRequest = returnSchemaPassword.parse(user);

  return returnEditUser;
};

export { editUserService };

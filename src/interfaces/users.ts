import { DeepPartial } from "typeorm";
import { getUsersSchema, returnSchemaPassword } from "../schemas/usersSchema";
import { z } from "zod";

type Tusers = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

type TuserPasswordRequest = z.infer<typeof returnSchemaPassword>;

type TarrayUsers = z.infer<typeof getUsersSchema>;

type TeditUser = DeepPartial<Tusers>;

export { Tusers, TuserPasswordRequest, TarrayUsers, TeditUser };

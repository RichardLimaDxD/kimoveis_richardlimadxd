import { Request, Response } from "express";
import {
  TarrayUsers,
  TeditUser,
  TuserPasswordRequest,
  Tusers,
} from "../interfaces/users";
import { createUsersService } from "../services/users/createUsers.service";
import { getUsersService } from "../services/users/getUsers.service";
import { editUserService } from "../services/users/editUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";

const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const dataUser: Tusers = request.body;

  const newData: TuserPasswordRequest = await createUsersService(dataUser);

  return response.status(201).json(newData);
};

const getUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const getUsers: TarrayUsers = await getUsersService();

  return response.json(getUsers);
};

const editUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data: TeditUser = request.body;

  const id: number = parseInt(request.params.id);

  const editInformation = await editUserService(data, id);

  return response.json(editInformation);
};

const deleteUserController = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);

  await deleteUserService(id);

  return response.status(204).send();
};

export {
  createUsersController,
  getUsersController,
  editUserController,
  deleteUserController,
};

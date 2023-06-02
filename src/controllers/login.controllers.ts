import { Request, Response } from "express";
import { TloginRequest } from "../interfaces/login";
import { createLoginService } from "../services/login/createLogin.service";

const createLoginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: TloginRequest = request.body;

  const token: string = await createLoginService(loginData);

  return response.status(200).json({ token });
};

export { createLoginController };

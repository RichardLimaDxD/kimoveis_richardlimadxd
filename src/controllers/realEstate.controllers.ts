import { Request, Response } from "express";
import { getEstateService } from "../services/realEstete/getEstate.service";
import { createRealEstateService } from "../services/realEstete/createEstate.service";
import { TRequestRealEstate, TRealEstate } from "../interfaces/realEstate";

const createEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data: TRealEstate = request.body;

  const newData: TRequestRealEstate = await createRealEstateService(data);

  return response.status(201).json(newData);
};

const getEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data = await getEstateService();

  return response.status(200).json(data);
};

export { createEstateController, getEstateController };

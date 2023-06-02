import { Request, Response } from "express";
import { createCategoryService } from "../services/category/createCategory.service";
import {
  TarrayCategory,
  Tcategoty,
  TreponseCategory,
} from "../interfaces/category";
import { getCategoryCategoryService } from "../services/category/getCategory.service";
import { getCategoryRealEstateService } from "../services/category/getCategoryRealEstate.service";

const createCategoryControlller = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data: Tcategoty = request.body;

  const newData: TreponseCategory = await createCategoryService(data);

  return response.status(201).json(newData);
};

const getCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data: TarrayCategory = await getCategoryCategoryService();

  return response.status(200).json(data);
};

const getCategoryRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = parseInt(request.params.id);

  const realEstate = await getCategoryRealEstateService(id);

  return response.status(200).json(realEstate);
};

export {
  createCategoryControlller,
  getCategoryController,
  getCategoryRealEstateController,
};

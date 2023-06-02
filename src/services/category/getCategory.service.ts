import { Repository } from "typeorm";
import { TarrayCategory } from "../../interfaces/category";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const getCategoryCategoryService = async (): Promise<TarrayCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category[] = await categoryRepository.find();

  return category;
};

export { getCategoryCategoryService };

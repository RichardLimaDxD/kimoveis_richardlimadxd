import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { Tcategoty, TreponseCategory } from "../../interfaces/category";
import { requestCategorySchema } from "../../schemas/categorySchema";

const createCategoryService = async (data: Tcategoty) => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(data);

  await categoryRepository.save(category);

  const returnCategory: TreponseCategory =
    requestCategorySchema.parse(category);

  return returnCategory;
};

export { createCategoryService };

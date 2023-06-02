import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";

const getCategoryRealEstateService = async (id: number) => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const findId: Category | null = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      realEstate: true,
    },
  });

  return findId;
};

export { getCategoryRealEstateService };

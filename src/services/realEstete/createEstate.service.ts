import { Repository } from "typeorm";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { TRequestRealEstate, TRealEstate } from "../../interfaces/realEstate";

const createRealEstateService = async (
  data: TRealEstate
): Promise<TRequestRealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const verifyAddress: Address | null = await addressRepository.findOneBy({
    street: data.address.street,
    zipCode: data.address.zipCode,
    number: data.address.number!,
    city: data.address.city,
    state: data.address.state,
  });

  if (verifyAddress) {
    throw new AppError("Address already exists", 409);
  }

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOne({
    where: {
      id: data.categoryId,
    },
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const address: Address = addressRepository.create(data.address);
  await addressRepository.save(address);

  const realEstate: RealEstate = realEstateRepository.create(data);

  realEstate.address = address;

  realEstate.category = findCategory;

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export { createRealEstateService };

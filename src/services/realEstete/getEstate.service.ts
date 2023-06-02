import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { TGetRealEstate } from "../../interfaces/realEstate";

const getEstateService = async (): Promise<TGetRealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: RealEstate[] = await realEstateRepository.find({
    relations: ["address"],
  });

  return findRealEstate;
};
export { getEstateService };

import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { ICarCreate, ICar } from "../../interfaces/car";

export const createCarService = async ({
  brand,
  model,
  year_fabrication,
  year_model,
  shift,
}: ICarCreate): Promise<ICar> => {
  const carRepository = AppDataSource.getRepository(Car);

  const car = carRepository.create({
    brand,
    model,
    year_fabrication,
    year_model,
    shift,
  });

  await carRepository.save(car);

  return car;
};

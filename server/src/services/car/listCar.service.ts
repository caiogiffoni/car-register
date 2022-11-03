import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { ICar } from "../../interfaces/car";

export const listCarService = async (): Promise<ICar[]> => {
  const carRepository = AppDataSource.getRepository(Car);

  const cars = await carRepository.find();

  return cars;
};

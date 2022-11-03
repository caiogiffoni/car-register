import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { ICarList } from "../../interfaces/car";

export const listCarService = async (): Promise<ICarList[]> => {
  const carRepository = AppDataSource.getRepository(Car);

  const cars = await carRepository.find();

  return cars;
};

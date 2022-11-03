import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { ICar } from "../../interfaces/car";

export const readFilteredCarService = async (
  shiftFilter: string
): Promise<ICar[]> => {
  const carRepository = AppDataSource.getRepository(Car);

  const cars = await carRepository.find({
    where: {
      shift: shiftFilter,
    },
  });

  return cars;
};

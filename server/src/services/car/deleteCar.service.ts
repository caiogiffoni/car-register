import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { AppError } from "../../errors/appError";

export const deleteCarService = async (id: string): Promise<void> => {
  const carRepository = AppDataSource.getRepository(Car);

  if (id.length !== 36) {
    throw new AppError(404, "Wrong car id");
  }

  const car = await carRepository.findOneBy({
    id: id,
  });

  if (!car) {
    throw new AppError(404, "Car not found");
  }

  await carRepository.remove(car);
};

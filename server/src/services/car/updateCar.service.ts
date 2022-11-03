import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { AppError } from "../../errors/appError";
import { ICar, ICarUpdate } from "../../interfaces/car";

export const updateCarService = async ({
  id,
  brand,
  model,
  year_fabrication,
  year_model,
  shift,
}: ICarUpdate): Promise<ICar> => {
  const carRepository = AppDataSource.getRepository(Car);

  if (id.length !== 36) {
    throw new AppError(404, "Wrong car id");
  }

  const car = await carRepository.findOne({
    where: { id },
  });

  if (!car) {
    throw new AppError(404, "Car not found!");
  }

  brand = brand ? brand : car.brand;
  model = model ? model : car.model;
  year_fabrication = year_fabrication ? year_fabrication : car.year_fabrication;
  year_model = year_model ? year_model : car.year_model;
  shift = shift ? shift : car.shift;

  const updatedCar = {
    ...car,
    brand,
    model,
    year_fabrication,
    year_model,
    shift,
  };

  await carRepository.save(updatedCar);

  return updatedCar;
};

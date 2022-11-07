import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/Car";
import { AppError } from "../../errors/appError";
import { ICarCreate, ICar } from "../../interfaces/car";

export const createCarService = async ({
  brand,
  model,
  year_fabrication,
  year_model,
  shift,
  color,
}: ICarCreate): Promise<ICar> => {
  const carRepository = AppDataSource.getRepository(Car);

  // Procurar por carro já existente
  const findCar = await carRepository.findOne({
    where: {
      brand,
      model,
      year_fabrication,
      year_model,
      shift,
      color,
    },
  });

  // Retornar erro se carro ja existente estiver no banco
  if (findCar) {
    throw new AppError(403, "This car already exists");
  }

  const car = carRepository.create({
    brand,
    model,
    year_fabrication,
    year_model,
    shift,
    color,
  });

  await carRepository.save(car);

  return car;
};

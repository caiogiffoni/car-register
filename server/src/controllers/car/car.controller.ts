import { Request, Response } from "express";
import { createCarService } from "../../services/car/createCar.service";
import { deleteCarService } from "../../services/car/deleteCar.service";
import { listCarService } from "../../services/car/listCar.service";
import { readFilteredCarService } from "../../services/car/listFilteredCar.service";
import { updateCarService } from "../../services/car/updateCar.service";

export default class CarController {
  // Criar Carros
  async create(req: Request, res: Response) {
    const { brand, model, year_fabrication, year_model, shift, color } =
      req.body;
    const newCar = await createCarService({
      brand,
      model,
      year_fabrication,
      year_model,
      shift,
      color,
    });
    return res.status(201).json(newCar);
  }

  // Ler Carros
  async read(req: Request, res: Response) {
    const cars = await listCarService();
    return res.status(200).json(cars);
  }

  //Atualizar Carro por id
  async update(req: Request, res: Response) {
    const { brand, model, year_fabrication, year_model, shift, color } =
      req.body;
    const { id } = req.params;
    const updatedCar = await updateCarService({
      id,
      brand,
      model,
      year_fabrication,
      year_model,
      shift,
      color,
    });

    return res.status(200).json(updatedCar);
  }

  // Deletar Carros
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteCarService(id);
    return res.status(200).json({ message: "Car deleted!" });
  }

  // Filtrar Carros por Shift
  async filterPerShift(req: Request, res: Response) {
    const { shiftFilter } = req.params;
    const cars = await readFilteredCarService(shiftFilter);
    return res.status(200).json(cars);
  }
}

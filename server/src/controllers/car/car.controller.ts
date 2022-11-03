import { Request, Response } from "express";
import { createCarService } from "../../services/car/createCar.service";
import { deleteCarService } from "../../services/car/deleteCar.service";
import { listCarService } from "../../services/car/listCar.service";
import { updateCarService } from "../../services/car/updateCar.service";

export default class CarController {
  async create(req: Request, res: Response) {
    const { brand, model, year_fabrication, year_model, shift } = req.body;
    const newCar = await createCarService({
      brand,
      model,
      year_fabrication,
      year_model,
      shift,
    });
    return res.status(201).json(newCar);
  }

  async read(req: Request, res: Response) {
    const events = await listCarService();
    return res.status(200).json(events);
  }

  //Atualizar Car por id
  async update(req: Request, res: Response) {
    const { brand, model, year_fabrication, year_model, shift } = req.body;
    const { id } = req.params;
    const updatedCar = await updateCarService({
      id,
      brand,
      model,
      year_fabrication,
      year_model,
      shift,
    });

    return res.status(200).json(updatedCar);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteCarService(id);
    return res.status(200).json({ message: "Car deleted!" });
  }
}

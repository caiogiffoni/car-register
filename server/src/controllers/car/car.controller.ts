import { Request, Response } from "express";
import { createCarService } from "../../services/car/createCar.service";
import { listCarService } from "../../services/car/listCar.service";

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

  // async readOneEvent(req: Request, res: Response) {
  //   const id = req.params.id;
  //   const event = await listOneEventService(id);
  //   return res.status(200).json(event);
  // }

  // async update(req: Request, res: Response) {
  //   const { name, description, date } = req.body;
  //   const id = req.params.id;
  //   const user = req.user.id;
  //   await updateEventService({
  //     name,
  //     description,
  //     date,
  //     id,
  //     user,
  //   });

  //   return res.status(200).json({ message: "Event updated!" });
  // }

  // async delete(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const user = req.user.id;
  //   await deleteEventService(id, user);
  //   return res.status(200).json({ message: "Event deleted!" });
  // }
}

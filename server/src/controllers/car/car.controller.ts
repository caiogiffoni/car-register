import { Request, Response } from "express";
import { listCarService } from "../../services/car/listCar.service";

export default class CarController {
  // async create(req: Request, res: Response) {
  //   const { name, description, date } = req.newEvent;
  //   const user = req.user.id;
  //   const newEvent = await createEventService({
  //     name,
  //     description,
  //     date,
  //     user,
  //   });
  //   return res.status(201).json(newEvent);
  // }

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

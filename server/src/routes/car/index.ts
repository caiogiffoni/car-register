import { Router } from "express";
import CarController from "../../controllers/car/car.controller";

const carRoutes = Router();
const carController = new CarController();

carRoutes.get("", carController.read);
carRoutes.post("", carController.create);
carRoutes.delete("/:id", carController.delete);

export default carRoutes;

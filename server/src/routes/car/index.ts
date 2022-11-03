import { Router } from "express";
import CarController from "../../controllers/car/car.controller";

const carRoutes = Router();
const carController = new CarController();

carRoutes.get("", carController.read);
carRoutes.get("/shift/:shiftFilter", carController.filterPerShift);
carRoutes.post("", carController.create);
carRoutes.patch("/:id", carController.update);
carRoutes.delete("/:id", carController.delete);

export default carRoutes;

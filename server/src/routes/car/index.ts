import { Router } from "express";
import CarController from "../../controllers/car/car.controller";

const carRoutes = Router();
const carController = new CarController();

carRoutes.get("", carController.read);

export default carRoutes;

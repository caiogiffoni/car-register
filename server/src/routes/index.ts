import { Express } from "express";
import carRoutes from "./car";

export const appRoutes = (app: Express) => {
  app.use("/car", carRoutes);
};

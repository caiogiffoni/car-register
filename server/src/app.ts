import express from "express";
import "express-async-errors";
import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

let cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

appRoutes(app);

app.use(errorMiddleware);


export default app;

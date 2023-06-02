import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import { errorHandle } from "./error";
import { usersRouters } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { categoryRoutes } from "./routes/category.routes";
import { schedulesRoutes } from "./routes/schedules.routes";
import { realEstateRouters } from "./routes/realEstate.routes";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRouters);

app.use("/login", loginRoutes);

app.use("/categories", categoryRoutes);

app.use("/schedules", schedulesRoutes);

app.use("/realEstate", realEstateRouters);

app.use(errorHandle);

export default app;

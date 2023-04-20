import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import routes from "./routes";
import { handleApplicationErrors } from "./middlewares/errorMiddleware";

const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

export default app;

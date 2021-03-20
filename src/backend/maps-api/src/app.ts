import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { router as apiRouter } from "./routes/api";

export const app = express();

const reactApp = express.static(path.join(__dirname, "../../../frontend/maps-ui/build"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(reactApp);

app.use("/api", apiRouter);
app.use("/*", reactApp);

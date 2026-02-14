import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/Error.middleware";
import { ApiError } from "./utils/apiError";



const app = express();


app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser()); 


app.use(express.static("public"));





app.get("/health", (_, res) => {
  res.status(200).json({ status: "active", service: "Batiyoun Backend" });
});


app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});


app.use(errorHandler);

export { app };
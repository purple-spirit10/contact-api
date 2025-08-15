import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.routes.js";
import { errorHandler, notFound } from "./middlewares/error.js";

const app = express();

// Security & basics
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Healthcheck
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/contacts", contactRoutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;

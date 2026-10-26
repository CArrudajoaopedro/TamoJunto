import "dotenv/config";
import express from "express";
import eventsRoutes from "./events/events.routes";
import { errorHandler } from "./errors/errorHandler";
import { loadConfig } from "./config";
import { NotFoundError } from "./errors/NotFoundError";
import { swaggerSpec } from "../docs/swagger";
import swaggerUi from "swagger-ui-express"
import { authRoutes } from "./auth/auth.routes";

const config = loadConfig();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authRoutes);
app.use(eventsRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: NotFoundError = new NotFoundError("A rota solicitada não existe.");
  next(err);
});
app.use(errorHandler)
app.listen(config.port, () => {
  console.log(`Servidor rodando em http://localhost:${config.port}`);
});
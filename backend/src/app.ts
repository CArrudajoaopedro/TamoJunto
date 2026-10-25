import "dotenv/config";
import express from "express";
import eventsRoutes from "./events/events.routes";
import { errorHandler } from "./errors/errorHandler";
import { loadConfig } from "./config";
const config = loadConfig();
const app = express();
app.use(express.json());
app.use(eventsRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: AppError = new Error("A rota solicitada não existe.");
  err.statusCode = 404;
  err.code = "ROUTE_NOT_FOUND";
  next(err);
});
app.use(errorHandler)
app.listen(config.port, () => {
console.log(`Servidor rodando em http://localhost:${config.port}`);
});
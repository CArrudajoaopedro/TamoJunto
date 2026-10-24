import "dotenv/config";
import express from "express";
import eventsRoutes from "./events/events.routes";
//import { errorHandler } from "./errors/errorHandler";
import { loadConfig } from "./config";
const config = loadConfig();
const app = express();
app.use(express.json());
app.use(eventsRoutes);
app.listen(config.port, () => {
console.log(`Servidor rodando em http://localhost:${config.port}`);
});
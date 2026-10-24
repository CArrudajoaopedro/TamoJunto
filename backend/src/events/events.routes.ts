import { Router } from "express";
import * as eventsController from "./events.controller";
const router = Router();
router.get("/api/events", eventsController.getAll);
router.get("/api/events/:id", eventsController.getById);
router.post("/api/events", eventsController.create);
export default router;
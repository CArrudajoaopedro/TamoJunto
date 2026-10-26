import { Router } from "express";
import * as eventsController from "./events.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();
/**
* @swagger
*   /api/events:
*       get:
*           summary: Retorna a lista de todos os eventos
*           tags: [Events]
*           responses:
*               200:
*                   description: Lista de eventos retornada com sucesso
*                   content:
*                       application/json:
*                           schema:
*                               type: array
*                               items:
*                                   $ref: '#/components/schemas/Event'
*/
router.get("/api/events", eventsController.getAll);
router.get("/api/events/:id", eventsController.getById);
router.post("/api/events", requireAuth, eventsController.create);
router.put("/api/events/:id", requireAuth,  eventsController.update);
router.delete("/api/events/:id", requireAuth, eventsController.remove);
export default router;
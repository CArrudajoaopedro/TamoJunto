import { Request, Response, NextFunction } from "express";
import * as eventsService from "./events.service";
import { Event, EventProps, EventUpt } from "./events.entity";
import {AppError} from "../errors/AppError"
import {BadRequestError} from "../errors/BadRequestError"

/**
* @swagger
* components:
*   schemas:
*     Event:
*      type: object
*      required:
*       - title
*       - location
*       - date
*       - capacity
*       - organizerId
*      properties:
*        id:
*         type: integer
*         description: ID gerado automaticamente
*        title:
*         type: string
*         description: Título do evento
*        location:
*         type: string
*         description: Local do evento
*        date:
*         type: string
*         description: Data do evento
*         format: date-time
*        capacity:
*         type: integer
*         description: Cpacidade do evento
*        organizerId:
*         type: integer
*         description: Id do organizador do evento
*      example:
*      title: "Workshop de TypeScript"
*      description: "Curso obrigatório de programação Web"
*      location: "Auditório Central"
*      date: "2026-11-20T19:00:00.000Z"
*      capacity: 50
*      organizerId: 1
*/

export async function getAll(req: Request, res: Response, next:
NextFunction) {
try {
// O controller recebe o array de objetos da classe Event
const events: Event[] = await eventsService.listAll();
// Aqui ocorre a conversão técnica para JSON e o envio pela rede
res.json(events);
} catch (err) {
next(err);
}
}
export async function getById(req: Request, res: Response, next: NextFunction) {
 try {
   // req.params.id vem como string, precisamos converter para número
   const eventId = Number(req.params.id);


   // Validação básica do parâmetro
   if (isNaN(eventId)) {
     const error: AppError = new AppError("ID do evento inválido. Deve ser um número.", 400, "BAD_REQUEST");
     next(error);
     return;
   }


   // Chama a camada de serviço
   const event: Event = await eventsService.getById(eventId);


   // Formata a resposta devolvendo os getters da instância da classe Event
   res.json({
     id: event.id,
     title: event.title,
     description: event.description,
     location: event.location,
     date: event.date,
     capacity: event.capacity,
     organizerId: event.organizerId,
     createdAt: event.createdAt
   });


 } catch (error: any) {
     next(error);
 }
}
export async function create(req: Request, res: Response , next: NextFunction){
 try {
   const { title, description, location, date, capacity, organizerId } = req.body;


   if (!title || !location || !date || capacity === undefined || !organizerId) {
      // Em vez de enviar o res.status().json(), criamos um erro e passamos para o next
      const error = new AppError("Campos obrigatórios ausentes.", 400, "BAD_REQUEST");
      next(error);
      return;
   }
  
   const eventData: EventProps = {
       title,
       description,
       location,
       date: new Date(date),
       capacity: Number(capacity),
       organizerId: Number(organizerId)
     };


     const createdEvent = await eventsService.create(eventData);


     res.status(201).json({
       message: "Evento criado com sucesso!",
       event: {
         id: createdEvent.id,
         title: createdEvent.title,
         description: createdEvent.description,
         location: createdEvent.location,
         date: createdEvent.date,
         capacity: createdEvent.capacity,
         organizerId: createdEvent.organizerId,
         createdAt: createdEvent.createdAt
       }
     });
   } catch (error: any) {
   next(error);
 }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  try
  {
    const event_id: number = Number(req.params.id);
    if (isNaN(event_id))
    {
      const error: AppError = new AppError("ID do evento inválido. Deve ser um número.", 400, "BAD_REQUEST");
      next(error);
      return;
    }
    let { title, description, location, date, capacity, organizerId } = req.body;
    if (date)
    {
      date = new Date(date);
      if (!(date instanceof Date && !isNaN(date.getTime())))
      {
        throw new BadRequestError("Data inválida");
      }
    }
    if (capacity)
    {
      capacity = Number(capacity);
      if (isNaN(capacity))
      {
        throw new BadRequestError("Capacidade inválida");
      }
    }
    if (organizerId)
    {
      organizerId = Number(organizerId);
      if (isNaN(capacity))
      {
        throw new BadRequestError("Capacidade inválida");
      }
    }
    const eventData: EventUpt = {
       title,
       description,
       location,
       date,
       capacity,
       organizerId
     };
    const event: Event = await eventsService.update(event_id, eventData);
    res.json({
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      capacity: event.capacity,
      organizerId: event.organizerId,
      createdAt: event.createdAt
    });
  }
  catch (error: any)
  {
    next(error);
  }
}
export async function remove(req: Request, res: Response, next: NextFunction) {
  try
  {
    const eventId = Number(req.params.id);
    if (isNaN(eventId)) {
      const error: AppError = new AppError("ID do evento inválido. Deve ser um número.", 400, "BAD_REQUEST");
      next(error);
      return;
    }
    await eventsService.remove(eventId);
    res.status(204).send();
  }
  catch (err)
  {
    next(err);
  }
}
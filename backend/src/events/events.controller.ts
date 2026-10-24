import { Request, Response, NextFunction } from "express";
import * as eventsService from "./events.service";
import { Event, EventProps } from "./events.entity";
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
     const error = new Error("ID do evento inválido. Deve ser um número.");
     (error as any).statusCode = 400;
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
      const error = new Error("Campos obrigatórios ausentes.");
      (error as any).statusCode = 400;      
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


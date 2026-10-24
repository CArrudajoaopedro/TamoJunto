import * as eventsRepository from "./events.repository";
import { Event, EventProps } from "./events.entity";
export async function listAll() {
return eventsRepository.findAll();
}
export async function getById(id: number) {
 const event = await eventsRepository.getById(id);
  if (!event) {
   const error = new Error("Evento não encontrado.");
   (error as any).statusCode = 404; // Código 404 para Not Found
   throw error; // Lançamos o erro para ser capturado no catch do Controller
 }


 return event;
}
export async function create(props: EventProps) {
   // A validação de capacidade negativa já roda de forma nativa no Setter da Entidade Event. Nosso construtor usa a data atual como createdAt
   const newEvent = new Event(props);


   // Salva no banco através do repositório
   return await eventsRepository.save(newEvent);
 }

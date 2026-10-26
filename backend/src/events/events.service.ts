import * as eventsRepository from "./events.repository";
import { Event, EventProps, EventUpt } from "./events.entity";
import {NotFoundError} from "../errors/NotFoundError"
export async function listAll() {
return eventsRepository.findAll();
}
export async function getById(id: number) {
 const event = await eventsRepository.getById(id);
  if (!event) {
   const error: NotFoundError = new NotFoundError("Evento não encontrado.");
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
export async function update(id: number, data: EventUpt) {
  const event = eventsRepository.getById(id);
  if (!event)
  {
    const error: NotFoundError = new NotFoundError("Evento não encontrado.");
    throw error;
  }
  return eventsRepository.update(id, data);
}
export async function remove(id: number) {
  const event = getById(id);
  if (!event)
  {
    const error: NotFoundError = new NotFoundError("Evento não encontrado.");
    throw error;
  }
  await eventsRepository.remove(id);
}
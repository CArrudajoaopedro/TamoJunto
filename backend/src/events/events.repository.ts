import { pool } from "../db";
import { Event, EventProps, EventUpt } from "./events.entity";
export async function findAll(){
    const result = await pool.query(`
        SELECT
        e.id,
        e.title,
        e.description,
        e.location,
        e.date,
        e.capacity,
        e.created_at,
        e.organizer_id
        FROM events e
        ORDER BY e.date ASC
    `);
    return result.rows.map((row) => {
    return new Event(
    {
        title: row.title,
        description: row.description,
        location: row.location,
        date: new Date(row.date),
        capacity: Number(row.capacity),
        organizerId: Number(row.organizer_id),
    },
    Number(row.id),
    new Date(row.created_at)
    );
    });
}
export async function getById(event_id: number){


 const result = await pool.query("SELECT * FROM events WHERE id = $1",[event_id]);


 const row = result.rows[0];


 if (!row) return null;
  const props: EventProps = {
   title: row.title,
   description: row.description,
   location: row.location,
   date: row.date,
   capacity: row.capacity,
   organizerId: row.organizerId
 };


 return new Event(props, row.id, row.createdAt);
}
export async function save(event: Event) {
  const query = `
     INSERT INTO events (title, description, location, date, capacity, organizer_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING id;
   `;


   const values = [
     event.title,
     event.description,
     event.location,
     event.date,
     event.capacity,
     event.organizerId,
     event.createdAt
   ];


   const result = await pool.query(query, values);
   const insertedId = result.rows[0].id;


   // Retorna uma nova instância do evento preenchida com o ID gerado pelo banco
   return new Event(
     {
       title: event.title,
       description: event.description,
       location: event.location,
       date: event.date,
       capacity: event.capacity,
       organizerId: event.organizerId
     },
     insertedId,
     event.createdAt
   );
 }
export async function update(event_id: number, data: EventUpt) {
  let update_query: string = `UPDATE events SET `;
  console.log(data)
  const update_values: Array<string | number | Date> = [];
  if (data.title !== undefined)
  {
    update_query += `title = $${update_values.length + 1}`;
    update_values.push(data.title);
  }
  if (data.description !== undefined)
  {
    if (update_values.length > 0) update_query += ","
    update_query += ` description = $${update_values.length + 1}`;
    update_values.push(data.description);
  }
  if (data.location !== undefined)
  {
    if (update_values.length > 0) update_query += ","
    update_query += ` location = $${update_values.length + 1}`;
    update_values.push(data.location);
  }
  if (data.date !== undefined)
  {
    if (update_values.length > 0) update_query += ","
    update_query += ` date = $${update_values.length + 1}`;
    update_values.push(data.date);
  }
  if (data.capacity !== undefined)
  {
    if (update_values.length > 0) update_query += ","
    update_query += ` capacity = $${update_values.length + 1}`;
    update_values.push(data.capacity);
  }
  if (data.organizerId !== undefined)
  {
    if (update_values.length > 0) update_query += ","
    update_query += ` organizerId = $${update_values.length + 1}`;
    update_values.push(data.organizerId);
  }
  if (update_values.length > 0)
  {
    update_query += ` WHERE id = $${update_values.length + 1}`;
    update_values.push(event_id);
    await pool.query(update_query, update_values);
  }
  return getById(event_id);
}
export async function remove(event_id: number) {
  const query: string = `DELETE FROM events WHERE id = $1`;
  await pool.query(query, [event_id]);
}
import {pool} from "../db"
import {User, UserProps} from "./users.entity"

export async function findByEmail(email: string)
{
    const query: string = `SELECT * FROM users WHERE email = $1`;
    const row = (await pool.query(query, [email])).rows[0];
    if (!row)
    {
        return null;
    }
    const props: UserProps = {
        name: row.name,
        email: row.email,
        password: row.password,
    };
    return new User(props, row.id, row.createdAt);
}
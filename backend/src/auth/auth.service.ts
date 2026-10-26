import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as userRepository from "../users/users.repository"
import { AppError } from "../errors/AppError"

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
{
    throw new Error("FATAL: JWT_SECRET não foi definido no ambiente.");
}

export async function login(email: string, typed_password: string)
{
    const user = await userRepository.findByEmail(email);
    if (!user || !user.password)
    {
        throw new AppError("E-mail ou senha incorretos", 401, "UNAUTHORIZED");
    }
    const senhaValida = bcrypt.compare(typed_password, user.password);
    if (!senhaValida)
    {
        throw new AppError("E-mail ou senha incorretos", 401, "UNAUTHORIZED");
    }
    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: "2h"});
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    };
}
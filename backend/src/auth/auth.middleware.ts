import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
{
    throw new Error("FATAL: JWT_SECRET não foi definido no ambiente.");
}

export async function requireAuth(req: Request, res: Response, next: NextFunction)
{
    const authHeader = req.headers.authorization;
    if (!authHeader)
    {
        throw new AppError("Token de autenticação não fornecido", 401, "UNAUTHORIZED");
    }
    const [, token] = authHeader.split(" ");
    try
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (err)
    {
        throw new AppError("Token inválido ou expirado.", 401, "UNAUTHORIZED");
    }
}
import * as authService from "./auth.service"
import { Request, Response, NextFunction } from "express"
import { BadRequestError } from "../errors/BadRequestError"

export async function login(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const {email, password} = req.body;
        if (!email || !password)
        {
            throw new BadRequestError("E-mail e senha são obrigatórios.");
        }
        const result = await authService.login(email, password);
        res.status(200).json(result);
    }
    catch (err)
    {
        next(err);
    }
}
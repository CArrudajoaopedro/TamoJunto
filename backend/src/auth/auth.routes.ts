import { Router } from "express";
import {login} from "./auth.controller"

const authRoutes = Router();
authRoutes.post("/api/login", login);
export {authRoutes};
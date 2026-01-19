import { Router } from "express";
import { login, register, validateToken } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/validate-token", validateToken)

export default authRouter
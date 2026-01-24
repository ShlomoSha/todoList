import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/me", protect, getCurrentUser)

export default authRouter
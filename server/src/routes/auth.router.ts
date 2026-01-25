import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/me", protect, getCurrentUser)

export default authRouter
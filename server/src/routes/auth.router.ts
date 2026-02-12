import { Router } from "express";
import { getCurrentUser, login, register, requestPasswordReset, resetUserPassword } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/me", protect, getCurrentUser)
authRouter.post("/forgot-password", requestPasswordReset)
authRouter.post("/reset-password", resetUserPassword)

export default authRouter
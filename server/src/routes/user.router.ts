import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { updateProfile } from "../controllers/user.controller";

const userRouter = Router()

userRouter.use(protect)

userRouter.patch('/profile', updateProfile)

export default userRouter

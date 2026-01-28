import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const taskRouter = Router()

taskRouter.use(protect)

taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', getTaskById)
taskRouter.post('/', createTask)
taskRouter.put('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)

export default taskRouter
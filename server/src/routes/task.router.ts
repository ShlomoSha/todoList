import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, getUserStats, toggleTaskCompletion, updateTask } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const taskRouter = Router()

taskRouter.use(protect)

taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', getTaskById)
taskRouter.get('/stats', getUserStats)
taskRouter.post('/', createTask)
taskRouter.patch('/:id', updateTask)
taskRouter.patch('/toggle/:id', toggleTaskCompletion)
taskRouter.delete('/:id', deleteTask)

export default taskRouter
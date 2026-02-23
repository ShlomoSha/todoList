import { ROUTES } from "../routes/routes.constants";
import type { CreateTaskDTO, UpdateTaskDTO } from "../types/dto/tasks.dto";
import createEndpoint from "./apiHelper.utlis";
import axiosInstance from "./axiosConfig";

export const taskEndpoint = createEndpoint(ROUTES.TASKS)

const tasksService = {
    getAllTasks: () => axiosInstance.get(taskEndpoint()),

    getUserStats: () => axiosInstance.get(taskEndpoint(ROUTES.STATS)),

    getTaskById: (taskId: string) => axiosInstance.get(taskEndpoint(taskId)),

    createTask: (taskData: CreateTaskDTO) => axiosInstance.post(taskEndpoint(), taskData),

    toggleTaskCompletion: (taskId: string) => axiosInstance.patch(taskEndpoint(`${ROUTES.TOGGLE}/${taskId}`)),

    updateTask: (taskId: string, updates: UpdateTaskDTO) => axiosInstance.patch(taskEndpoint(taskId), updates),

    deleteTask: (taskId: string) => axiosInstance.delete(taskEndpoint(taskId)),    
}

export default tasksService
import { Types } from "mongoose"
import { TaskModel } from "../models/tasks/task.schema"
import { CreateTaskDTO, UpdateTaskDTO } from "../types/dto/task.dto"
import { BadRequestError, NotFoundError } from "../errors/httpErrors"
import { validateData } from "../utils/validiation"

export const findAllTasks = async (userId: string) => {
    const query = { assignedTo: new Types.ObjectId(userId) }
    const tasks = await TaskModel.find(query).select('-assignedTo')
    return tasks
}

export const findTaskById = async (taskId: string) => {
    if (!Types.ObjectId.isValid(taskId)) {
        throw new BadRequestError('Invalid task id format')
    }

    const task = await TaskModel.findById(taskId).select('-assignedTo')

    if (!task) {
        throw new NotFoundError()
    }

    return task
}

export const createTask = async (taskData: CreateTaskDTO, userId: string) => {
    validateData(taskData, ["title"])

    const { title, description } = taskData

    const newTask = await TaskModel.create({
        title,
        description: description ?? "",
        assignedTo: userId
    })

    const { assignedTo: _, ...taskResponse } = newTask.toObject()

    return taskResponse
}

export const updateTask = async (taskId: string, updates: UpdateTaskDTO) => {
    if (!Types.ObjectId.isValid(taskId)) {
        throw new BadRequestError('Invalid task id format')
    }

    const updatedTask = TaskModel.findByIdAndUpdate(
        taskId,
        { $set: updates },
        { new: true, runValidators: true }
    )

    if (!updatedTask) {
        throw new NotFoundError()
    }

    return updatedTask
}

export const deleteTask = async (taskId: string) => {
    if (!Types.ObjectId.isValid(taskId)) {
        throw new BadRequestError('Invalid task id format')
    }

    const deletedTask = await TaskModel.findByIdAndDelete(taskId)

    if (!deletedTask) {
        throw new NotFoundError()
    }
}

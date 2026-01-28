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

export const toggleTaskCompletion = async (taskId: string) => {
    if (!Types.ObjectId.isValid(taskId)) {
        throw new BadRequestError('Invalid task id format')
    }

    const task = await findTaskById(taskId)

    task.isCompleted = !task.isCompleted
    await task.save()

    return task
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

export const getUserTaskStats = async (userId: string) => {
    const stats = await TaskModel.aggregate([
        { $match: { assignedTo: new Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                completed: {
                    $sum: { $cond: ["$isCompleted", 1, 0] }
                },
                pending: {
                    $sum: { $cond: ["$isCompleted", 0, 1] }
                }
            }
        }
    ])

    const { total = 0, completed = 0, pending = 0 } = stats[0] || {}

    return {
        total,
        completed,
        pending,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    }
}
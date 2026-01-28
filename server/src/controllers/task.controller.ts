import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as taskService from "../services/task.service"

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const allTasks = await taskService.findAllTasks(req.user.id)

    res.status(200).json({
        success: true,
        data: allTasks,
    })
})

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const task = await taskService.findTaskById(req.params.id)
    
    res.status(200).json({
        success: true,
        data: task,
    })
})

export const createTask = asyncHandler(async (req: Request, res: Response) => {
    const newTask = await taskService.createTask(req.body, req.user.id)

    res.status(201).json({
        success: true,
        data: newTask,
        message: "Task created successfully",
    })
})

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const updatedTask = await taskService.updateTask(req.params.id, req.body)

    res.status(200).json({
        success: true,
        data: updatedTask,
        message: "Task updated successfully",
    })
})

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    await taskService.deleteTask(req.params.id)

    res.sendStatus(204)
})
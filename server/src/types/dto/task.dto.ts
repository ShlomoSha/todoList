import ITask from "../../models/tasks/task.interface";

export interface CreateTaskDTO {
    title: string;
    description?: string;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    isCompleted?: boolean;
}

export interface TaskResponseDTO extends ITask {
    id: string;
}
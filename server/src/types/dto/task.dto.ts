import ITask from "../../models/tasks/tasks.interface";

export interface CreateTaskDTO {
    title: string;
    description?: string;
    assignedTo: string;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    isCompleted?: boolean;
    assignedTo?: string;
}

export interface TaskResponseDTO extends ITask {
    id: string;
}
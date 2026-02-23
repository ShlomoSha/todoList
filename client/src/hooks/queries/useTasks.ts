import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tasksService from "../../api/tasksService";
import type { CreateTaskDTO, UpdateTaskDTO } from "../../types/dto/tasks.dto";

export const TASKS_QUERY_KEYS = {
    all: ["tasks"] as const,
    list: () => [...TASKS_QUERY_KEYS.all, "list"] as const,
    stats: () => [...TASKS_QUERY_KEYS.all, "stats"] as const,
    detail: (id: string) => [...TASKS_QUERY_KEYS.all, "detail", id] as const,
};

export const useTasks = () => {
    return useQuery({
        queryKey: TASKS_QUERY_KEYS.list(),
        queryFn: async () => {
            const response = await tasksService.getAllTasks();
            return response.data.data;
        },
    });
};

export const useTaskStats = () => {
    return useQuery({
        queryKey: TASKS_QUERY_KEYS.stats(),
        queryFn: async () => {
            const response = await tasksService.getUserStats();
            return response.data.data;
        },
    });
};

export const useTaskMutations = () => {
    const queryClient = useQueryClient();

    const invalidateTasks = () => {
        queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEYS.all });
    };

    const createMutation = useMutation({
        mutationFn: (data: CreateTaskDTO) => tasksService.createTask(data),
        onSuccess: invalidateTasks,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskDTO }) =>
            tasksService.updateTask(id, updates),
        onSuccess: invalidateTasks,
    });

    const toggleMutation = useMutation({
        mutationFn: (id: string) => tasksService.toggleTaskCompletion(id),
        onSuccess: invalidateTasks,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => tasksService.deleteTask(id),
        onSuccess: invalidateTasks,
    });

    return {
        createTask: createMutation.mutateAsync,
        updateTask: updateMutation.mutateAsync,
        toggleTask: toggleMutation.mutateAsync,
        deleteTask: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isToggling: toggleMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};

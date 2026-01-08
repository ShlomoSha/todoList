export default interface ITask {
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt?: Date;
}
import { model, Schema } from "mongoose";
import TaskDocument from "./task.models";

export const TaskSchema = new Schema<TaskDocument>(
    {
        title: {
            type: String,
            required: [true, "Task title is required!"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const TaskModel = model<TaskDocument>("Tasks", TaskSchema)
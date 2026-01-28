import { Document, Types } from "mongoose";
import ITask from "./task.interface";

export default interface TaskDocument extends ITask, Document {
    assignedTo: Types.ObjectId;
}
import { Document, Types } from "mongoose";
import ITask from "./tasks.interface";

export default interface TaskDocument extends ITask, Document {
    assignedTo: Types.ObjectId;
}
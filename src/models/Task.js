import mongoose from "mongoose";
import { userSchema } from "./User.js";

const taskSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    descricao: { type: String, required: true },
    user: userSchema
}, { versionKey: false });

const task = mongoose.model("tasks", taskSchema);

export default task;
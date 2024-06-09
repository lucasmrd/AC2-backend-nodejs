import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    funcao: { type: String, required: true },
}, { versionKey: false });

const user = mongoose.model("users", userSchema);

export { user, userSchema };
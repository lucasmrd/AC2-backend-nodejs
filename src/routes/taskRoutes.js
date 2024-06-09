import express from "express";
import TaskController from "../controllers/taskController.js";
import checkToken from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/task", checkToken, TaskController.criarTask);

routes.get("/task/semdono", checkToken, TaskController.listarTasksSemDono);
routes.get("/task", checkToken, TaskController.listarTaskUsuario);

routes.put("/task/adduser/:id", checkToken, TaskController.adicionarUser);
routes.put("/task/:id", checkToken, TaskController.editarTask);

routes.delete("/task/:id", checkToken, TaskController.excluirTask);




export default routes;
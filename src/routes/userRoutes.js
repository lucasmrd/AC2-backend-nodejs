import express from "express";
import UserController from "../controllers/userController.js";
import checkToken from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/users", checkToken, UserController.criarUser);
routes.get("/users", checkToken, UserController.listarUsers);
routes.put("/users/:id", checkToken, UserController.atualizarUser);
routes.delete("/users/:id", checkToken, UserController.deletarUser);
routes.get("/users/qntporfuncao", checkToken, UserController.qntPorFuncao);

export default routes;
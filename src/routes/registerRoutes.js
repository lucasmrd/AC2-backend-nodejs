import express from "express";
import RegisterController from "../controllers/registerController.js";

const routes = express.Router();

routes.post("/register", RegisterController.registrarUser);

export default routes;
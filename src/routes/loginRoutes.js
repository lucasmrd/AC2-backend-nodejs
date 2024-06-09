import express from "express";
import loginController from "../controllers/loginController.js";

const routes = express.Router();

routes.post("/login", loginController.logarUser);

export default routes;
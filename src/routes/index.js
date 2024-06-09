import express from "express";
import users from "./userRoutes.js";
import register from "./registerRoutes.js";
import login from "./loginRoutes.js";
import task from "./taskRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("backend works"));

    app.use(express.json(), users, register, login, task);
};

export default routes;
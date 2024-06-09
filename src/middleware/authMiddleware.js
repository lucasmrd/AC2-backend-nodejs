import jwt from "jsonwebtoken";
import { user } from "../models/User.js";

const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado!" });
    }
    
    try {
        const secret = "secret1234"

        const verificado = jwt.verify(token, secret);
        req.user = await user.findById(verificado.id);
        next();

    } catch(erro) {
        res.status(400).json({ message: "Token inválido" });
        
    }
}

export default checkToken;
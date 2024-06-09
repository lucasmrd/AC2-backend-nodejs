import { user }  from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class loginController {

    static async logarUser(req, res) {
        const { email, senha } = req.body;

        const userExists = await user.findOne({ email: email })

        if (!userExists) {
            return res.status(404).json({ message: "Usuário inexistente!" });
        }

        const checkSenha = await bcrypt.compare(senha, userExists.senha);

        if (!checkSenha) {
            return res.status(422).json({ message: "Senha incorreta!" });
        }


        try {
            const secret = "secret1234";

            const token = jwt.sign({ id: userExists._id }, secret);

            res.status(200).json({ message: "Autenticacao realizada com sucesso!", token });

        } catch (erro) {
            console.log(erro);

            res.status(500).json({ message: "Erro no servidor!" });
        }

    };
}

export default loginController;
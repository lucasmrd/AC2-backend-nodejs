import { user } from "../models/User.js";
import bcrypt from "bcrypt";

class RegisterController {

    static async registrarUser(req, res) {
        const { nome, email, senha, confirmSenha, funcao } = req.body;

        const userExists = await user.findOne({ email: email })

        if (userExists) {
            return res.status(422).json({ message: "Email já cadastrado!" });
        }

        if (senha !== confirmSenha) {
            return res.status(422).json({ message: "As senhas não são iguais!" });
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUser = new user({
            nome,
            email,
            funcao,
            senha: senhaHash,
        });

        try {
            await novoUser.save();
            res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (erro) {
            console.log(erro);

            res.status(500).json({ message: "Erro no servidor!" });
        }
    };
}

export default RegisterController;
import { user } from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
    static async listarUsers (req, res) {
        try {
            const listaUsers = await user.find({});
            res.status(200).json(listaUsers);
        } catch (erro) {
            res.status(500).json({ message: "falha na requisicao" });
        }
    };

    static async criarUser (req, res) {
        const { nome, email, senha, funcao } = req.body;
        const userExists = await user.findOne({ email:email })

        if (userExists) {
            return res.status(422).json({ message: "Email já cadastrado!" });
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUser = new user ({
            nome,
            email,
            funcao,
            senha: senhaHash,
        });

        try {
            await novoUser.save();

            res.status(201).json({ message: "User criado com sucesso!", user: novoUser });
        } catch (erro) {
            res.status(500).json({ message: "Falha ao criar User!" });
        }
    }

    static async atualizarUser (req, res) {
        const { email } = req.body;
        const userExists = await user.findOne({ email:email })

        if (userExists) {
            return res.status(422).json({ message: "Email já cadastrado!" });
        }

        try {
            const id = req.params.id;
            await user.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "User atualizado!" });
        } catch (erro) {
            res.status(500).json({ message: "falha na atualizacao" });
        }
    };

    static async deletarUser (req, res) {
        try {
            const id = req.params.id;
            await user.findByIdAndDelete(id);
            res.status(204).json({ message: "User deletado" });
        } catch (erro) {
            res.status(500).json({ message: "falha em deletar User" });
        }
    };

    static async qntPorFuncao(req, res) {
        try {
            const quantidadePorFuncao = await user.aggregate([
                {
                    $group: {
                        _id: "$funcao",
                        count: { $sum: 1 }
                    }
                }
            ]);

            const resultado = quantidadePorFuncao.reduce((acc, funcao) => {
                acc[funcao._id] = funcao.count;
                return acc;
            }, {});

            res.status(200).json(resultado);
        } catch (erro) {
            res.status(500).json({ message: "falha ao obter contagem de usuários por função" });
        }
    }

}

export default UserController;
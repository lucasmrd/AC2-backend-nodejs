import task from "../models/Task.js";
import { user } from "../models/User.js";

class TaskController {

    static async criarTask(req, res) {

        const novaTask = req.body;
        const { descricao, user: userId } = req.body;

        try {
            if (!userId) {
                const taskSalva = new task({ descricao });
                await taskSalva.save();
                res.status(201).json({ message: "Task criada com sucesso!", task: taskSalva });

            }

            const userEncontrado = await user.findById(novaTask.user);

            if (!userEncontrado) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            const taskCompleta = { ...novaTask, user: { ...userEncontrado._doc } };
            const taskCriada = await task.create(taskCompleta);

            res.status(201).json({ message: "Task criada com sucesso", task: novaTask });


        } catch (error) {
            if (!res.headersSent) {
                res.status(500).json({ message: 'Erro ao criar a tarefa', error: error.message });
            } else {
                console.error('Erro após o cabeçalho ser enviado:', error);
            }
        }
    }

    static async listarTaskUsuario(req, res) {
        const userId = req.user.id; // id do usuario logado

        try {
            const tasks = await task.find({});
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
        }
    }

    static async editarTask(req, res) {
        const { descricao } = req.body;
        const id = req.params.id;
        const taskExists = await task.findOne({ _id: id });

        if (!taskExists) {
            return res.status(422).json({ message: "Tarefa não encontrada" });
        }

        try {
            await task.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Task atualizada!" });
        } catch (erro) {
            res.status(500).json({ message: "Falha na atualizacao" });
        }
    }


    static async excluirTask(req, res) {
        const id = req.params.id;
        const taskExists = await task.findOne({ _id: id });

        if (!taskExists) {
            return res.status(422).json({ message: "Tarefa não encontrada" });
        }

        try {
            await task.findByIdAndDelete(id, req.body);
            res.status(204).json({ message: "Task deletada!" });
        } catch (erro) {
            res.status(500).json({ message: "Falha ao deletar task" });
        }
    }

    static async listarTasksSemDono(req, res) {
        try {
            const tarefasSemDono = await task.find({ user: { $exists: false } });
            res.status(200).json(tarefasSemDono);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar tarefas sem dono', error: error.message });
        }
    }

    static async adicionarUser(req, res) {
        const id = req.params.id;
        const { user: userId } = req.body;

        try {
            const tarefa = await task.findById(id);
            if (!tarefa) {
                res.status(404).json({ message: "Tarefa não encontrada" });
            }

            const usuario = await user.findById(userId);
            if (!usuario) {
                res.status(404).json({ message: "Usuário não encontrado" });
            }

            tarefa.user = usuario;
            await tarefa.save();

            res.status(200).json({ message: "Dono adicionado com sucesso à tarefa", task: tarefa });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar dono à tarefa', error: error.message });
        }
    }

}

export default TaskController;
import {autor} from "../models/Autor.js";

class AutorController {


    static async listarAutores (req, res){
        try {
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);            
        } catch (error) {
            res.status(500).json({message: `Erro ao listar autores - ${erro.message}`});
        }
    };

    static async buscarAutorPorId (req, res){
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({message: `Erro ao buscar autor - ${erro.message}`});
        }
    };

    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body);
            res.status(201).json(novoAutor);
        } catch (erro) {
            res.status(500).json({message: `Erro ao criar o autor - ${erro.message}`});
        }        
    };

    static async atualizarAutor(req, res){
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            const autorAtualizado = await autor.findById(id);
            res.status(200).json(autorAtualizado);            
        } catch (error) {
            res.status(500).json({message: `Erro ao atualizar o autor - ${erro.message}`});
        }
    };

    static async excluirAutor(req, res){
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: `Autor deletado`});
        } catch (error) {
            res.status(500).json({message: `Erro ao deletar o autor - ${erro.message}`});
        }
    };

};

export default AutorController;
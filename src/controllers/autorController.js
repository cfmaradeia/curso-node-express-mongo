import {autor} from "../models/Autor.js";

class AutorController {


    static async listarAutores (req, res, next){
        try {
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);            
        } catch (error) {
            next(error);
        }
    };

    static async buscarAutorPorId (req, res, next){
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);

            if (autorEncontrado !== null){
                res.status(200).json(autorEncontrado);
            } else {
                res.status(404).json({message: "Autor não encontrado"});    
            }
            
        } catch (error) {
            next(error);
        }
    };

    static async cadastrarAutor(req, res, next){
        try{
            const novoAutor = await autor.create(req.body);
            res.status(201).json(novoAutor);
        } catch (error) {
            next(error);
        }        
    };

    static async atualizarAutor(req, res, next){
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            const autorAtualizado = await autor.findById(id);
            res.status(200).json(autorAtualizado);            
        } catch (error) {
            next(error);
        }
    };

    static async excluirAutor(req, res, next){
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: `Autor deletado`});
        } catch (error) {
            next(error);
        }
    };

};

export default AutorController;
import NaoEncontrado from "../errors/NaoEncontrado.js";
import {autor} from "../models/index.js";

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
                next(new NaoEncontrado("Autor não encontrado"))
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
            const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

            if (autorEncontrado === null){
                next(new NaoEncontrado("Autor não encontrado"))
            }

            const autorAtualizado = await autor.findById(id);
            res.status(200).json(autorAtualizado);            
        } catch (error) {
            next(error);
        }
    };

    static async excluirAutor(req, res, next){
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findByIdAndDelete(id);

            if (autorEncontrado === null){
                next(new NaoEncontrado("Autor não encontrado"))
            }

            res.status(200).json({message: `Autor deletado`});
        } catch (error) {
            next(error);
        }
    };

};

export default AutorController;
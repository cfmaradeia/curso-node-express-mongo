
import NaoEncontrado from "../errors/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {


    static async listarLivros (req, res){
        try {
            const listaLivros = await livros.find({});
            res.status(200).json(listaLivros);            
        } catch (error) {
            res.status(500).json({message: `Erro ao listar livros - ${error.message}`});
        }
    };

    static async buscarLivros (req, res){
        try {
            const qEditora = req.query.editora;
            const listaLivros = await livros.find({editora : qEditora});
            res.status(200).json(listaLivros);            
        } catch (error) {
            res.status(500).json({message: `Erro ao listar livros - ${error.message}`});
        }
    };

    static async buscarLivrosPorId (req, res, next){
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findById(id);
            
            if (livroEncontrado !== null){
                res.status(200).json(livroEncontrado);
            } else {
                next(new NaoEncontrado("Livro não encontrado"))
            }
        } catch (error) {
            res.status(500).json({message: `Erro ao buscar livro - ${error.message}`});
        }
    };

    static async cadastrarLivro(req, res){
        try{
            let livro = new livros(req.body);

            const livroResultado = await livro.save();
            res.status(201).json(livroResultado);
        } catch (error) {
            res.status(500).json({message: `Erro ao criar o livro - ${error.message}`});
        }        
    };

    static async atualizarLivro(req, res, next){

        try {            
            const id = req.params.id;
    
            const livroEncontrado = await livros.findByIdAndUpdate(id, {$set: req.body});

            if (livroEncontrado !== null){
                const livroAtualizado = await livros.findById(id);
                res.status(200).json(livroAtualizado);
            } else {
                next(new NaoEncontrado("Livro não encontrado"))
            }
        } catch (error) {
            res.status(500).json({message: `Erro ao atualizar o livro - ${error.message}`});
        }
    };

    static async excluirLivro(req, res, next){
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findByIdAndDelete(id);

            if (livroEncontrado !== null){
                res.status(200).json({message: `Livro deletado`});
            } else {
                next(new NaoEncontrado("Livro não encontrado"))
            }
        } catch (error) {
            res.status(500).json({message: `Erro ao deletar o livro - ${error.message}`});
        }
    };


};

export default LivroController;
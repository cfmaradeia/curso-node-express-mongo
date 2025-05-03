import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {


    static async listarLivros (req, res){
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);            
        } catch (error) {
            res.status(500).json({message: `Erro ao listar livros - ${error.message}`});
        }
    };

    static async buscarLivros (req, res){
        try {
            const qEditora = req.query.editora;
            const listaLivros = await livro.find({editora : qEditora});
            res.status(200).json(listaLivros);            
        } catch (error) {
            res.status(500).json({message: `Erro ao listar livros - ${error.message}`});
        }
    };

    static async buscarLivrosPorId (req, res){
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);            
        } catch (error) {
            res.status(500).json({message: `Erro ao buscar livro - ${error.message}`});
        }
    };

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}}
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json(livroCriado);
        } catch (error) {
            res.status(500).json({message: `Erro ao criar o livro - ${error.message}`});
        }        
    };

    static async atualizarLivro(req, res){

        const id = req.params.id;
        const dadosLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(dadosLivro.autor);
            const livroCompleto = {...dadosLivro, autor: {...autorEncontrado._doc}}

            await livro.findByIdAndUpdate(id, livroCompleto);
            const livroAtualizado = await livro.findById(id);
            res.status(200).json(livroAtualizado);            
        } catch (error) {
            res.status(500).json({message: `Erro ao atualizar o livro - ${error.message}`});
        }
    };

    static async excluirLivro(req, res){
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: `Livro deletado`});
        } catch (error) {
            res.status(500).json({message: `Erro ao deletar o livro - ${error.message}`});
        }
    };


};

export default LivroController;
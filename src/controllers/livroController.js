import livro from "../models/Livro.js";

class LivroController {


    static async listarLivros (req, res){
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);            
        } catch (error) {
            res.status(500).json({message: `Erro ao listar livros - ${erro.message}`});
        }
    };

    static async buscarLivrosPorId (req, res){
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);            
        } catch (error) {
            res.status(500).json({message: `Erro ao buscar livro - ${erro.message}`});
        }
    };

    static async cadastrarLivro(req, res){
        try{
            const novoLivro = await livro.create(req.body);
            res.status(201).json(novoLivro);
        } catch (erro) {
            res.status(500).json({message: `Erro ao criar o livro - ${erro.message}`});
        }        
    };

    static async atualizarLivro(req, res){
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            const livroAtualizado = await livro.findById(id);
            res.status(200).json(livroAtualizado);            
        } catch (error) {
            res.status(500).json({message: `Erro ao atualizar o livro - ${erro.message}`});
        }
    };

    static async excluirLivro(req, res){
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: `Livro deletado`});
        } catch (error) {
            res.status(500).json({message: `Erro ao deletar o livro - ${erro.message}`});
        }
    };


};

export default LivroController;

import NaoEncontrado from "../errors/NaoEncontrado.js";
import {autor, livro} from "../models/index.js";

class LivroController {


    static async listarLivros (req, res, next){
        try {
            const buscaLivros = livro.find();
            req.resultado = buscaLivros;
            next();           
        } catch (error) {
            next(error);
        }
    };

    static async buscarLivros (req, res, next){
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const livrosResultado = livro.find(busca).populate("autor");
        
                req.resultado = livrosResultado;
        
                next();
            } else {
            res.status(200).send([]);
            }    
        } catch (error) {
            next(error);
        }
    };

    static async buscarLivrosPorId (req, res, next){
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            
            if (livroEncontrado !== null){
                res.status(200).json(livroEncontrado);
            } else {
                next(new NaoEncontrado("Livro não encontrado"))
            }
        } catch (error) {
            next(error);
        }
    };

    static async cadastrarLivro(req, res, next){
        try{
            let livro = new livro(req.body);

            const livroResultado = await livro.save();
            res.status(201).json(livroResultado);
        } catch (error) {
            next(error);
        }        
    };

    static async atualizarLivro(req, res, next){

        try {            
            const id = req.params.id;
    
            const livroEncontrado = await livro.findByIdAndUpdate(id, {$set: req.body});

            if (livroEncontrado !== null){
                const livroAtualizado = await livro.findById(id);
                res.status(200).json(livroAtualizado);
            } else {
                next(new NaoEncontrado("Livro não encontrado"))
            }
        } catch (error) {
            next(error);
        }
    };

    static async excluirLivro(req, res, next){
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findByIdAndDelete(id);

            if (livroEncontrado !== null){
                res.status(200).json({message: `Livro deletado`});
            } else {
                next(new NaoEncontrado("Livro não encontrado"))
            }
        } catch (error) {
            next(error);
        }
    };


};

async function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  
    let busca = {};
  
    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  
    if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  
    // gte = Greater Than or Equal = Maior ou igual que
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    // lte = Less Than or Equal = Menor ou igual que
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  
    if (nomeAutor) {
      const autorSel = await autor.findOne({ nome: nomeAutor });
  
      if (autorSel !== null) {
        busca.autor = autorSel._id;
      } else {
        busca = null;
      }
    }
  
    return busca;
  }
  

export default LivroController;
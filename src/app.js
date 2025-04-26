import express from "express";
import connectDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";


const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão realizada com sucesso");
})


const app = express();
app.use(express.json())

const livros = [
    {
        id: 1,
        titulo: "Senhor dos anéis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
]


app.get("/", (req, res) => {
    res.status(200).send("Livraria")
});

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index])
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).json(livros);
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo
    res.status(200).json(livros)
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido");
});

function buscaLivro(id){
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}

export default app;

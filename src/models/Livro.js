import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: [true, "O título do livro é obrigatório"]},
    editora: {type: String, required: [true, "A editora do livro é obrigatória"], enum: {values:["Casa do código", "Alura"], message: "Editora {VALUE} não permitida"}},
    preco: {type: Number},
    paginas: {type: Number, min: [10, "Páginas devem ser maior que 10 e menor que 5000"], max: [5000, "Páginas devem ser maior que 10 e menor que 5000"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O autor do livro é obrigatório"]}
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;

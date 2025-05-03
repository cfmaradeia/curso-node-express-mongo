/* eslint-disable no-unused-vars */
import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import manipuladorDeErros from "./middlewares/manipuladorErros.js";


const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão realizada com sucesso");
});

const app = express();

app.use((req, res, next) => {
    console.log("Código de um novo middleware");
    next();
});
routes(app);


app.use(manipuladorDeErros);

export default app;

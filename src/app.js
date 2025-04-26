import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";


const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão realizada com sucesso");
});

const app = express();
routes(app);

export default app;

import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next){
    if (error instanceof mongoose.Error.CastError){
        res.status(400).json({message: "ID do autor é inválido"});    
    }
    else {
        res.status(500).json({message: `Erro ao buscar autor - ${error.message}`});
    }
}

export default manipuladorDeErros;
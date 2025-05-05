import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator : (valor) => valor.trim() !== "",
    message: ({ path }) => `O Campo ${path} não pode estar em branco`
});
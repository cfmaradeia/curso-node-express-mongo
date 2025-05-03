import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{

    constructor(error){
        const messages = Object.values(error.errors).map(erro => erro.message).join("; ");
        super(`${messages}`)

    }
}

export default ErroValidacao;
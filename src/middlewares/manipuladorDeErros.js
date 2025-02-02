const ErroBase = require("../erros/ErroBase");
const RequisicaoIncorretaErro = require("../erros/RequisicaoIncorretaErro");

function manipuladorDeErros(erro, req, res, next) {
    if(erro instanceof ErroBase) {
        erro.enviarResposta(res);
    } else if(erro.name === "SequelizeValidationError")  {
        new RequisicaoIncorretaErro(erro.errors.map(e => e.message).join(", ")).enviarResposta(res);
    }
    
    else {
        new ErroBase(erro.message).enviarResposta(res);
    }
    
}

module.exports = manipuladorDeErros;
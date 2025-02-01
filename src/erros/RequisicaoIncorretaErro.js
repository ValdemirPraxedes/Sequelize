const ErroBase = require('./ErroBase.js');

class RequisicaoIncorretaErro extends ErroBase {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
        super(mensagem, 400);
    }
}

module.exports = RequisicaoIncorretaErro;
const ErroBase = require('./ErroBase.js');

class RecursoNaoEncontradoErro extends ErroBase {
    constructor(mensagem = "Recurso não encontrado") {
        super(mensagem, 404);
    }
}

module.exports = RecursoNaoEncontradoErro;
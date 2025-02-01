const ErroBase = require('../erros/ErroBase.js');

function manipuladorNaoEncontradoError(req, res, next) {
    const erro = new ErroBase("Recurso Não Encontrado", 404);
    next(erro);
}

module.exports = manipuladorNaoEncontradoError;
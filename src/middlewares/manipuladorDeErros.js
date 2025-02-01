function manipuladorDeErros(erro, req, res, next) {
    erro.enviarResposta(res);
}

module.exports = manipuladorDeErros;
const RequisicaoIncorretaErro = require("../erros/RequisicaoIncorretaErro");

 function paginarResultado(req, res, next) {
    try {
    let { limite = 5, pagina = 1, ordenacao = "id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
    
    if (limite > 0 && pagina > 0) {
     resultado.sort((a,b) =>
      {
        if(a[campoOrdenacao] < b[campoOrdenacao]) return ordem === -1 ? -1: 1;
        if(a[campoOrdenacao] > b[campoOrdenacao]) return ordem === 1 ? 1: -1;
        return 0;
      });


      const inicio = (pagina - 1) * limite;
      const fim = inicio + limite;

      res.status(200).json(resultado.slice(inicio, fim));
    } else {
      next(new RequisicaoIncorretaErro());
    }
  } catch (erro) {
    next(erro);
  }
}

module.exports = paginarResultado;
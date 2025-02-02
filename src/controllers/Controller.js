const RecursoNaoEncontradoErro = require("../erros/RecursoNaoEncontradoErro");
const RequisicaoIncorretaErro = require("../erros/RequisicaoIncorretaErro");

class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }
    
    async  tratarQueryOrdenacaoPaginada(req) {
        let { limite = 5, pagina = 1, ordenacao = "id:ASC" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");
    
        limite = parseInt(limite);
        pagina = parseInt(pagina);

        return {limite, pagina, campoOrdenacao, ordem};
    }

    async pegaTodos(req, res, next) {
        try {

            const {limite, pagina, campoOrdenacao, ordem} = await this.tratarQueryOrdenacaoPaginada(req);
            const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros(limite, pagina, campoOrdenacao, ordem);
            return res.status(200).json(listaDeRegistros);
 
        } catch (erro) {
            next(erro);
        }
    }

    async pegaUmPorId(req, res, next) {
        const { id } = req.params;
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
            
            if(umRegistro !== null) 
                return res.status(200).json(umRegistro);
            next(new RecursoNaoEncontradoErro());
        } catch (erro) {
            next(erro);
        }
    }


    async criaNovo(req, res, next) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
            return res.status(200).json(novoRegistroCriado);
        } catch (erro) {
            next(erro);
        }
    }



    async atualiza(req, res, next) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));

            if (!foiAtualizado) {
                next(new RequisicaoIncorretaErro("registro não atualizado"));
            }

            return res.status(200).json({ mensagem: `registro atualizado` });

        } catch (error) {
            next(erro);
        }
    }

    async exclui(req, res, next) {
        const { id } = req.params;
        try {
            await this.entidadeService.excluiRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
            next(erro);
        }
    }
}
module.exports = Controller;
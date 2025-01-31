class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async pegaTodos(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros();
            return res.status(200).json(listaDeRegistros);
        } catch (erro) {
            // erro
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));

            if(!foiAtualizado) {
                return res.status(400).json({mensagem: `registro não atualizado`});
            }

            return res.status(200).json({mensagem: `registro atualizado`});

        } catch (error) {
            // erro
        }
    }
}
module.exports = Controller;
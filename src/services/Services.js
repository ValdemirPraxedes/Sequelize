const dataSource = require('../database/models');


class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
       
    }

    async pegaTodosOsRegistros(limite, pagina, campoOrdenacao, ordem) {
        return this.dataSource[this.model].findAll({
            limit: limite,
            offset: (pagina*limite),
            order: [[campoOrdenacao, ordem]]
        });
    }

    async pegaTodosOsRegistrosPorEscopo(escopo) {
        return dataSource[this.model].scope(escopo).findAll;
    }

    async pegaUmRegistroPorId(id) {
        return dataSource[this.model].findByPk(id);
    }

    async pegaUmRegistro(where) {
        return dataSource[this.model].findOne({where:{...where}});
    }

    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
        const listaDeRegistrosAtualizados = await dataSource[this.model].update(dadosAtualizados, { where: { ...where },
                                                                                             transaction: transacao });

        if (listaDeRegistrosAtualizados[0] == 0) {
            return false;
        }

        return true;
    }

    async pesquisaPorQuery(where, limite, pagina, campoOrdenacao, ordem) {
        return dataSource[this.model].findAll({
            limit: limite,
            offset: pagina,
            order: [[campoOrdenacao, ordem]],
            where: {
                ...where
            }
        });
    }

    async excluiRegistro(id) {
        return dataSource[this.model].destroy({ where: { id: id } });
    }

    async pegaEContaRegistros(options) {
        return dataSource[this.model].findAndCountAll({...options});
    }
}

module.exports = Services;
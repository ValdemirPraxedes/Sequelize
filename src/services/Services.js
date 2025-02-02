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

    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const listaDeRegistrosAtualizados = this.dataSource[this.model].update(dadosAtualizados, { where: { id } });

        if (listaDeRegistrosAtualizados[0] == 0) {
            return false;
        }

        return true;
    }

    async pesquisaPorQuery(query, limite, pagina, campoOrdenacao, ordem) {
        return dataSource[this.model].findAll({
            limit: limite,
            offset: pagina,
            order: [[campoOrdenacao, ordem]],
            where: {
                ...query
            }
        });
    }

    async excluiRegistro(id) {
        return dataSource[this.model].destroy({ where: { id: id } });
    }
}

module.exports = Services;
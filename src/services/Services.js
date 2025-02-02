const dataSource = require('../models');


class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
        this.dataSource = dataSource;
    }

    async pegaTodosOsRegistros(limite, pagina, campoOrdenacao, ordem) {
        try {
            return this.dataSource[this.model].findAll({
                limit: limite,
                offset: pagina,
                order: [[campoOrdenacao, ordem]]
            });
        }
        catch (erro) {
            console.log(erro);
        }
    }

    async pegaUmRegistroPorId(id) {
        return this.dataSource[this.model].findByPk(id);
    }

    async criaRegistro(dadosDoRegistro) {
        return this.dataSource[this.model].create(dadosDoRegistro);
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
        return this.dataSource[this.model].destroy({ where: { id: id } });
    }
}

module.exports = Services;
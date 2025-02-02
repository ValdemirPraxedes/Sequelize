const dataSource = require('../models');


class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
        this.dataSource = dataSource;
    }

    async pegaTodosOsRegistros() {
        return this.dataSource[this.model].findAll();
    }

    async pegaUmRegistroPorId(id) {
        return this.dataSource[this.model].findByPk(id);
      }

      async criaRegistro(dadosDoRegistro) {
        return this.dataSource[this.model].create(dadosDoRegistro);
      }

    async atualizaRegistro(dadosAtualizados, id) {
        const listaDeRegistrosAtualizados = this.dataSource[this.model].update(dadosAtualizados, { where:{id}});

        if(listaDeRegistrosAtualizados[0] == 0) {
            return false;
        } 

        return true;
    }

    async pesquisaPorQuery(query) {
        return dataSource[this.model].findAll({
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
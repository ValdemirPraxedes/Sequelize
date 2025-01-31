const dataSource = require('../models');


class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll();
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const listaDeRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, { where:{id}});

        if(listaDeRegistrosAtualizados[0] == 0) {
            return false;
        } 

        return true;
    }
}

module.exports = Services;
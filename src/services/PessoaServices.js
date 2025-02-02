const Services = require('./Services.js');
const { Op } = require("sequelize");

class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
    }

    async pegaMatriculasPorEstudante(id) {
        const estudante = await super.pegaUmRegistroPorId(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();

        return listaMatriculas;
    }

    async pesquisaPorQuery(nome, email, cpf) {
        const query = {};

        if(nome) query.nome = {[Op.like]: `%${nome}%`};
        if(email) query.email = {[Op.like]: `%${email}%`};
        if(cpf) query.cpf = { [Op.like]: `%${cpf}%`};

        return super.pesquisaPorQuery(query);
    }
}

module.exports = PessoaServices;
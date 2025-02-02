const RecursoNaoEncontradoErro = require('../erros/RecursoNaoEncontradoErro.js');
const dataSource = require('../database/models');
const Services = require('./Services.js');
const { Op } = require("sequelize");


class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
        this.matriculasServices = new Services("Matricula");
    }

    async pegaMatriculasAtivasPorEstudante(id) {
        const estudante = await super.pegaUmRegistroPorId(id);

        if(estudante == null) {
            throw new RecursoNaoEncontradoErro("Id do estudante não encontrado");
        }
        const listaMatriculas = await estudante.getAulasMatriculadas();

        return listaMatriculas;
    }

    async pegaTodasAsMatriculasPorEstudante(id) {
        const estudante = await super.pegaUmRegistroPorId(id);
        
        if(estudante == null) {
            throw new RecursoNaoEncontradoErro("Id do estudante não encontrado");
        }

        const listaMatriculas = await estudante.getTodasAsMatriculas();

        return listaMatriculas;
    }

    async pesquisaPorQuery(nome, email, cpf, limite, pagina, campoOrdenacao, ordem) {
        const query = {};

        if(nome) query.nome = {[Op.like]: `%${nome}%`};
        if(email) query.email = {[Op.like]: `%${email}%`};
        if(cpf) query.cpf = { [Op.like]: `%${cpf}%`};

        return super.pesquisaPorQuery(query, limite, pagina, campoOrdenacao, ordem);
    }

    async cancelaPessoaEMatriculas (estudanteId) {
        return dataSource.sequelize.transaction(async (transacao) => {
            await super.atualizaRegistro({ ativo: false }, { id: estudanteId }, transacao);
            await this.matriculasServices.atualizaRegistro({ status: 'cancelado' }, { estudante_id: estudanteId }, transacao);
        });
    }
}

module.exports = PessoaServices;
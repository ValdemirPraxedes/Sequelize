const database = require('../database/models/index.js');
const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');


const pessoaServices = new PessoaServices();

class PessoaController  extends Controller {

    constructor(){
        super(pessoaServices);
    }

    async pegaMatriculas(req, res, next) {
        const { estudanteId } = req.params;
        try {
            const listaMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudanteId));

            return res.status(200).json(listaMatriculas);
        } catch(erro) {
            next(erro);    
        }
    }

    async pesquisaPorQuery(req, res, next) {
        try {
            const {limite, pagina, campoOrdenacao, ordem} = await this.tratarQueryOrdenacaoPaginada(req);
            const {nome,email, cpf} = req.query;
            const pessoas = await pessoaServices.pesquisaPorQuery(nome, email, cpf, limite, pagina, campoOrdenacao, ordem);
            return res.status(200).json(pessoas);
        } catch (erro) {
            next(erro);
        }
    }
}

module.exports = PessoaController;
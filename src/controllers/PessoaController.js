const database = require('../database/models/index.js');
const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');


const pessoaServices = new PessoaServices();

class PessoaController  extends Controller {

    constructor(){
        super(pessoaServices);
    }

    async pegaMatriculasAtivas(req, res, next) {
        const { estudante_id } = req.params;
        try {
            const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));

            return res.status(200).json(listaMatriculas);
        } catch(erro) {
            next(erro);    
        }
    }

    async pegaMatriculasTodasAsMatriculas(req, res, next) {
        const { estudante_id } = req.params;
        try {
            const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_id));

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

    async cancelaRegistroEstudante(req, res, next) {
        const { estudante_id } = req.params;
        try {
            await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));

            return res.status(200).json({mensagem:`Matriculas de ref. estudante ${estudante_id} canceladas`});
        } catch(erro) {
            next(erro);
        }
    }
}

module.exports = PessoaController;
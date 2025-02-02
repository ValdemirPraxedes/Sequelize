const database = require('../database/models/index.js');
const MatriculaServices = require('../services/MatriculaServices.js');
const Controller = require('./Controller.js');
const Sequelize = require('sequelize');



const matriculaServices = new MatriculaServices();

class MatriculaController  extends Controller {

    constructor(){
        super(matriculaServices);
    }

    async pegaMatriculasPorEstudante(req, res, next) {
        const { estudante_id } = req.params;
        
        try {
            const listaMatriculasPorEstudante = await matriculaServices.pegaEContaRegistros({where: { estudante_id: Number(estudante_id), status: 'matriculado'}});

            return res.status(200).json(listaMatriculasPorEstudante.count);
        } catch (erro) {
            next(erro);
        }
    }

    async pegaCursosLotados(req, res, next) {
        const lotacaoCurso = 40;
        try {
            const cursosLotados = await matriculaServices.pegaEContaRegistros({
                                                                                where: {status: 'matriculado'},
                                                                                attributes: ['curso_id'],
                                                                                group: ['curso_id'],
                                                                                having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
                                                                                });

            return res.status(200).json(cursosLotados);
        } catch (erro) {
            next(erro);
        }
    }
}

module.exports = MatriculaController;
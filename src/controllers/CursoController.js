const database = require('../database/models/index.js');
const CursoServices = require('../services/CursoServices.js');
const Controller = require('./Controller.js');
const { Op } = require('sequelize');


const cursoServices = new CursoServices();

class CursoController  extends Controller {

    constructor(){
        super(cursoServices);
    }

    async pegaCurso(req, res, next) {
        const { data_inicial, data_final} = req.query;

        const where = {}

        data_inicial || data_final ? where.data_inicio = {}: null;

        data_inicial ? where.data_inicio[Op.gte] = data_inicial: null;

        data_final ? where.data_inicio[Op.lte] = data_final: null;

        try {
            const {limite, pagina, campoOrdenacao, ordem} = await this.tratarQueryOrdenacaoPaginada(req);
            const listaCursos = await cursoServices.pesquisaPorQuery(where,  limite, pagina, campoOrdenacao, ordem);

            return res.status(200).json(listaCursos);
        } catch(erro) {
            next(erro);
        }
    }
}

module.exports = CursoController;
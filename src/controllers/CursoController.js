const database = require('../models/index.js');
const CursoServices = require('../services/CursoServices.js');
const Controller = require('./Controller.js');



const cursoServices = new CursoServices();

class CursoController  extends Controller {

    constructor(){
        super(cursoServices);
    }
}

module.exports = CursoController;
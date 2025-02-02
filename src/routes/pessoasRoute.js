const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/busca/pessoas', (req, res, next) => pessoaController.pesquisaPorQuery(req, res,next));
router.get('/pessoas', (req, res, next) => pessoaController.pegaTodos(req, res,next));
router.get('/pessoas/:id', (req, res, next) => pessoaController.pegaUmPorId(req, res,next));
router.post('/pessoas', (req, res, next) => pessoaController.criaNovo(req, res,next));
router.put('/pessoas/:id', (req, res, next) => pessoaController.atualiza(req, res, next));
router.put('/pessoas/:estudante_id/cancela', (req, res,next) => pessoaController.cancelaRegistroEstudante(req, res, next));
router.delete('/pessoas/:id', (req, res, next) => pessoaController.exclui(req, res, next));
router.get('/pessoas/:estudante_id/matriculas', (req, res, next) => pessoaController.pegaMatriculasAtivas(req, res, next));
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res, next) => pessoaController.pegaMatriculasTodasAsMatriculas(req, res, next));
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res, next) => matriculaController.pegaMatriculasPorEstudante(req, res, next));
router.get('/pessoas/matriculas/lotadas', (req, res, next) => matriculaController.pegaCursosLotados(req, res, next));
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res, next) => matriculaController.pegaUm(req, res, next));
router.post('/pessoas/:estudante_id/matriculas', (req, res,next) => matriculaController.criaNovo(req, res, next));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res,next) => matriculaController.atualiza(req, res, next));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res,next) => matriculaController.exclui(req, res, next));

module.exports = router;
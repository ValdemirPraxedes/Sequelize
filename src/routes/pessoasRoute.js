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
router.delete('/pessoas/:id', (req, res, next) => pessoaController.exclui(req, res, next));
router.get('/pessoas/:estudanteId/matriculas', (req, res, next) => pessoaController.pegaMatriculas(req, res, next));
router.post('/pessoas/:estudanteId/matriculas', (req, res,next) => matriculaController.criaNovo(req, res, next));

module.exports = router;
const { Router } = require('express');
const CursoController = require('../controllers/CursoController.js');

const cursoController = new CursoController();

const router = Router();

router.get('/cursos', (req, res, next) => cursoController.pegaTodos(req, res, next));
router.get('/cursos/:id', (req, res, next) => cursoController.pegaUmPorId(req, res, next));
router.post('/cursos', (req, res, next) => cursoController.criaNovo(req, res, next));
router.put('/cursos/:id', (req, res, next) => cursoController.atualiza(req, res, next));
router.delete('/cursos/:id', (req, res, next) => cursoController.exclui(req, res, next));

module.exports = router;
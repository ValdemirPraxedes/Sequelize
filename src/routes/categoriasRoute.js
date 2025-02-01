const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

router.get('/categorias', (req, res, next) => categoriaController.pegaTodos(req, res, next));
router.get('/categorias/:id', (req, res, next) => categoriaController.pegaUmPorId(req, res, next));
router.post('/categorias', (req, res, next) => categoriaController.criaNovo(req, res, next));
router.put('/categorias/:id', (req, res, next) => categoriaController.atualiza(req, res, next));
router.delete('/categorias/:id', (req, res, next) => categoriaController.exclui(req, res, next));

module.exports = router;
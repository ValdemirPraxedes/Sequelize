const express = require('express');
const routes = require('./routes');
const manipuladorDeErros = require('./middlewares/manipuladorDeErros.js');
const manipuladorNaoEncontradoError = require('./middlewares/manipuladorNaoEncontradoError.js');
const paginarResultado = require('./middlewares/paginarResultado.js');

const app = express();
routes(app);
app.use(paginarResultado);
app.use(manipuladorNaoEncontradoError, manipuladorDeErros);

module.exports = app;

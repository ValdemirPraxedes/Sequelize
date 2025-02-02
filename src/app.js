const express = require('express');
const routes = require('./routes');
const manipuladorDeErros = require('./middlewares/manipuladorDeErros.js');
const manipuladorNaoEncontradoError = require('./middlewares/manipuladorNaoEncontradoError.js');

const app = express();
routes(app);
app.use(manipuladorNaoEncontradoError, manipuladorDeErros);

module.exports = app;

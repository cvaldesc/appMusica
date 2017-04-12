'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');

//configurar body parse
//convertir peticiones en objetos *.json que nos llegan de http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabecera htpp

//carga de rutas base
app.use('/api', user_routes);

//exportamos el modulo
module.exports = app;
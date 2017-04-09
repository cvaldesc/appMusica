'use strict'

var express = require('express');
var bodyParser = require('body-parse');

var app = express();

//cargar rutas

//configurar body parse
//convertir peticiones en objetos *.json que nos llegan de http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabecera htpp

//carga de rutas base

//exportamos el modulo
module.exports = app;
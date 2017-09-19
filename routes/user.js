'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
//middleware para comprobar autenticacion
var md_auth = require('../middlewares/authenticated');

//subir imagenes del usuario
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});


//rutas de las consultas a la base de datos
api.get('/probando', md_auth.ensureAuth, UserController.pruebas);
api.post('/registrar', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;
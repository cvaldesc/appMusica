'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas (req, res) {
	// body...
	res.status(200).send({
		message: 'probando una accion del controlador de usuarios del api rest con node y mongoose'
	});
}

//guardar un usario
function saveUser (req, res) {
	var user = new User();
	console.log(user);

	var params = req.body;
	console.log(params);

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';
	if(params.password){
		//encriptar contraseña
		bcrypt.hash(params.password, null, null, function(err, hash){
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){
				// guardar datos
				user.save((err, userStored) => {
					if(err){
						res.status(500).send({message:'Error al guardar el usuario'});
					}else{
						if (!userStored) {
							res.status(404).send({message:'No se ha registrado el usuario'});
						} else{
							res.status(200).send({user: userStored});
						}
					}
				});
			}else{
				res.status(200).send({
					message:'Rellena todos los campos'
				})
			}
		});
	}else{
		res.status(200).send({message: 'Introduce la contraseña'});
	}
	
}

//logear el usuario
function loginUser (req, res) {
	// body... 
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()},(err, user) => {
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!user){
				res.status(400).send({message:'el usuario no existe'});
			}else{
				//comprobar la contraseña
				bcrypt.compare(password, user.password, function (err, check) {
					if(check){
						//devolver los datos del usuario logueado
						if(params.gethash){
							//devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});

						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(400).send({message:'el usuario no ha podido loguearse'});
					}
				});
			}
		}
	});
}

//actualizar el usuario
function updateUser (req, res) {
	var userId = req.params.id;
	var update = req.body;

	//meotodo para actualizar en moogo
	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message:'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(400).send({message:'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated });
			}
		}
	})
}


//subir imagen
function uploadImage (req, res) {
	var userId = req.params.id;
	var file_name = 'No subio imagen...';

	if(req.files){

		//seprar la estructura de la iamgen
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		console.log(file_split);

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			User.findByIdAndUpdate(userId, {image: file_name}, (err , userUpdated) =>{
				if(!userUpdated){
					res.status(400).send({message:'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({user: userUpdated });
				}
			});

		}else{
			res.status(200).send({message: 'Extension del archivo no valida'});
		}
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile (req, res) {
	var imageFile = req.params.imageFile;
	var path_file = './uploads/users/'+ imageFile;
	fs.exists(path_file, function (exists) {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen...'});
		}
	});
}

//hace que los metodos se puedan desde otros archivos
module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};
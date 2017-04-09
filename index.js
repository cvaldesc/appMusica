'use strict'

//cargar un modulo 
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

//conectar base de datos
//function callbacks para la base de datos
mongoose.connect('mongodb://localhost:27017/appMusica',(err, res)=>{
	if(err){
		throw err;
	}else{
		console.log("la base de datos esta corriendo correctamente");

		app.listen(port,function(){
			console.log("servidor del api rest escuchando en el localhost:"+ port);
		});
	}
});
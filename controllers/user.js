'use strict'

function pruebas (req, res) {
	// body...
	res.status(200).send({
		message: 'probando una accion del controlador de usuarios del api rest con node y mongoose'
	});
}


module.exports = {
	pruebas
};
const { body } = require( 'express-validator/check' )
const express = require('express')
const router = express.Router()
const proyectosController = require('../controllers/proyectosController')

module.exports = () => {

    router.get('/', proyectosController.proyectosHome)
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto', 
        //Validaciones
        
        body( 'nombre' ).not().isEmpty().trim().escape(),
        //Fin validaciones

        proyectosController.nuevoProyecto)

    return router

}
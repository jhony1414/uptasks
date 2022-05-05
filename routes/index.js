const { body } = require( 'express-validator/check' )
const express = require('express')
const router = express.Router()
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')

module.exports = () => {

    router.get('/', proyectosController.proyectosHome)
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto', 
        //Validaciones
        
        body( 'nombre' ).not().isEmpty().trim().escape(),
        //Fin validaciones

        proyectosController.nuevoProyecto)
    //Listar proyectos
    router.get('/proyecto/:url', proyectosController.proyectoPorUrl)

    //Editar proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar)

    //Actualizar proyecto   
    router.post('/nuevo-proyecto/:id', 
        //Validaciones
        body( 'nombre' ).not().isEmpty().trim().escape(),
        
        //Fin validaciones

        proyectosController.actualizarProyecto)
    //Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)

    // TAREAS
    router.post('/proyectos/:url', tareasController.agregarTarea)

    return router

}
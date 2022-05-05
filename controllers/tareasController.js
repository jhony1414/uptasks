
const Proyectos = require('../models/Proyectos') 
const Tareas = require('../models/Tareas')

exports.agregarTarea= async ( req, res, next )=>{
    //obtener el proyecto
    const proyecto = await Proyectos.findOne({
        where: { url: req.params.url }, 
        
    })
    

    const { tarea } = req.body
    const estado = 0
    const proyectoId = proyecto.id

    //Insertar en DB
     const nuevaTarea = await Tareas.create(
         {
             tarea,
             estado,
             proyectoId 
        }
    )

    
    //Redireccionar
    res.redirect(`/proyecto/${req.params.url}`) 
}
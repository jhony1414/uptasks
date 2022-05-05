
const { request } = require('express')
const Proyectos = require( '../models/Proyectos' )
const Tareas = require( '../models/Tareas' )    

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll()

    res.render( 'index', 
        { 
            nombrePagina: 'Proyectos',
            proyectos
         } )
}

exports.formularioProyecto = async ( req, res ) => {
    const proyectos = await Proyectos.findAll()
    res.render('nuevoProyecto', { nombrePagina: 'Nuevo proyecto', proyectos })
}

exports.nuevoProyecto = async ( req, res) => {
    const proyectos = await Proyectos.findAll()
    
    // Consola de lo que recibo
    //console.log(req.body)
    // validar nombre no esta vacio

    const { nombre } = req.body

    let errores = []

    if (!nombre) {

        errores.push({ msg: 'Agrega un nombre' })
    }
    
    if(errores.length > 0){
        res.render('nuevoProyecto', 
        { 
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{

        //No hay errores
        //Guardar en DB
        const proyecto = await Proyectos.create( { nombre } )
        res.redirect('/')
       
    }
}

exports.proyectoPorUrl = async ( req, res, next ) =>{
    
    const proyectosPromise =  Proyectos.findAll()
    const proyectoPromise =  Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    
    const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise,  proyectoPromise])
    const tareas = await Tareas.findAll(
        {
            where: {
                proyectoId: proyecto.id
            },
            /* include: [
                { model:Proyectos }
            ] */
        }
    )
    console.log(tareas);
    if(!proyecto) {
        console.log('No hay datos')
        return next()
    }

    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    })
}
exports.formularioEditar = async ( req, res ) =>{
    const proyectosPromise =  Proyectos.findAll()
    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    })
    const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise,  proyectoPromise])

    console.log(proyecto);
    res.render( 'nuevoProyecto', {
        nombrePagina: 'Editar proyecto',
        proyectos,
        proyecto

    } )

}
//Actualizar
exports.actualizarProyecto = async ( req, res) => {
    const proyectos = await Proyectos.findAll()
    // Consola de lo que recibo
    //console.log(req.body)
    // validar nombre no esta vacio

    const { nombre } = req.body

    let errores = []

    if (!nombre) {

        errores.push({ msg: 'Agrega un nombre' })
    }
    
    if(errores.length > 0){
        res.render('nuevoProyecto', 
        { 
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{

        //No hay errores
        //Guardar en DB
        await Proyectos.update(
             { nombre: nombre },
             { where: { id: req.params.id } }
        )
        
        res.redirect('/')
       
    }
}
exports.eliminarProyecto = async ( req, res, next )=>{
    const { urlProyecto } = req.query
    const resultado = await Proyectos.destroy( {
        where:{ url: urlProyecto }
    } )
    if(!resultado){
        return next()
    }
}

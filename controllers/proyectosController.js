
const Proyectos = require( '../models/Proyectos' )

exports.proyectosHome = (req, res) => {
    res.render( 'index', { nombrePagina: 'Proyectos' } )
}

exports.formularioProyecto = ( req, res ) => {
    res.render('nuevoProyecto', { nombrePagina: 'Nuevo proyecto' })
}

exports.nuevoProyecto = async ( req, res) => {

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
            errores
        })
    }else{

        //No hay errores
        //Guardar en DB
        const proyecto = await Proyectos.create( { nombre } )
        res.redirect('/')
       
    }
}
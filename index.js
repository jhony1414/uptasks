const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const helpers = require( './helpers' )
const port = 3000

//Crear Conexion a db
const db = require( './config/db' )

//Importar Modelos
require('./models/Proyectos')
require('./models/Tareas')

// Comprobamos que hay conexion a la DB y creamos las tablas si no existen
db.sync()
    .then( () => console.log('Conectado a la DB') )
    .catch( error => console.log( error ) )

//Habilitar pug
app.set( 'view engine', 'pug' )
// Habilitar bodyParser para leer datos de formularios
app.use(bodyParser.urlencoded( { extends:true } ))

// Carpeta de vistas
app.set('views', path.join(__dirname, './views'))

//Pasar vardump a al app
app.use( ( req, res, next  ) => {
    res.locals.vardump = helpers.vardump // con res.locals creamos variable que puedo utilizar en toda la app
    next()
})

//Archivos estaticos
app.use(express.static('public'))

app.use(express.json())
app.use('/', routes())










// Servidor
app.listen(port, () =>{
    console.log(`Corriendo en localhost:${port}`)
})

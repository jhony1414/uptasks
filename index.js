const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const port = 3001

//Crear Conexion a db
const db = require( './config/db' )

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

//Archivos estaticos
app.use(express.static('public'))

app.use(express.json())
app.use('/', routes())










// Servidor
app.listen(port, () =>{
    console.log(`Corriendo en localhost:${port}`)
})

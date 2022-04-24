
const { Sequelize, DataTypes } = require('sequelize')
const db = require( '../config/db' )

const Proyectos = db.define('proyectos', 
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        }, 
        url: {
            type: DataTypes.STRING
        }
    }
)

module.exports = Proyectos



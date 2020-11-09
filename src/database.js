const mysql = require('mysql');
const {promisify}=require('util');

const {database}=require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.log("Conexión a base de datos perdida");
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.log("Demasiadas conexiones a la base de datos");
        }
        if(err.code==='ECONNREFUSED'){
            console.log("Conexión rechazada");
        }
    }

    if(connection){
        connection.release();
        console.log("Base de datos conectada");
    }
    
    return;
});

pool.query = promisify(pool.query);

module.exports=pool;
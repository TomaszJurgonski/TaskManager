const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "user",
    password: "1234",
    database: "task_manager_db",
    connectionLimit: 10
}).promise();

pool.getConnection((err, connection)=>{
    if(err){
        throw err;
    }

    console.log(`connected`);

    connection.release();
});

module.exports=pool;
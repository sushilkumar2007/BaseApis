module.exports = function () {

    let mysql = require('mysql2')
    
    //Establish Connection to the DB
    // let connection = mysql.createConnection({
    //     host: connCreds["host"],
    //     user: connCreds['username'],
    //     password: connCreds['password'],
    //     database: connCreds['database'],
    //     port: 3306
    // });

    var connection = mysql.createConnection({
        host: 'containers-us-west-135.railway.app',
        user: 'root',
        password: 'yAhGf57qQ8DiEPr5lzl5',
        port:'7297',
        database: "railway"
    });

    //Instantiate the connection
    connection.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`)
        } else {
            console.log(`DB connectionRequest Successful ${connection.threadId}`)
        }
    });

    //return connection object
    return connection
}
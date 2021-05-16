// this will be:
/*
{
    username: "__username__",
    password: "__password__"
}
to access it, you can say credentialsImport.username etc
*/
const mysql = require('mysql2');
const credentialsImport = require("./credentials");


const connection = mysql.createConnection({
    host: 'localhost',
    user: credentialsImport.username,
    password: credentialsImport.password,
    database: 'employeetracker'
});

//this is just text code
connection.query("SELECT * FROM department", (err, results, fields) => {
  console.log(err);
  console.log(results);
});


// use the 'INSERT INTO' sql command on the 'employee' table to create a new employee 
function addEmployee(first_name, last_name, manager_id, role_id) {
  
}

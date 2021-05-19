// this will be:
/*
{
    username: "__username__",
    password: "__password__"
}
to access it, you can say credentialsImport.username etc
*/
const mysql = require('mysql2/promise');
const credentialsImport = require("./credentials");


let connection;
mysql.createConnection({
  host: 'localhost',
  user: credentialsImport.username,
  password: credentialsImport.password,
  database: 'employeetracker'
}).then((con) => {
  connection = con;
  employeeRole(8, 2);
});


// use the 'INSERT INTO' sql command on the 'employee' table to create a new employee 
function addEmployee(first_name, last_name, manager_id, role_id) {
  const query = `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`;
  const data = [first_name, last_name, manager_id, role_id];
  connection.execute(query, data, (err, results, fields) => {
    // what to do when data is recieved
    console.log(err);
    console.log(results);
  });
}

function addRole(title, salary, department_id) {
  const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  const data = [title, salary, department_id];
  connection.execute(query, data, (err, results, fields) => {
    // what to do when data is recieved
    console.log(err);
    console.log(results);
  });
};

function addDepartment(name) {
  const query = `INSERT INTO department (name) VALUES (?)`;
  const data = [name];
  connection.execute(query, data, (err, results, fields) => {
    // what to do when data is recieved
    console.log(err);
    console.log(results);
  });
};

async function viewEmployees() {
  const [rows, fields] = await connection.execute("SELECT * FROM employee");
  return rows;
};
async function viewDepartment() {
  const [rows, fields] = await connection.execute("SELECT * FROM department");
  return rows;
};
async function viewRole() {
  const [rows, fields] = await connection.execute("SELECT * FROM role");
  return rows;
};

async function employeeRole(employee_id, role_id) {
  const query = `UPDATE employee SET role_id = ? WHERE id = ?;`;
  const data = [role_id, employee_id];
  const [rows, fields] = await connection.execute(query, data);
  return rows;
}
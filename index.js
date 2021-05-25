const inquirer = require('inquirer');
const sqlproxy = require('./sqlproxy');
const consoletable = require('console.table');

const choiceActions = {
    // key: value
    "view all departments": async function () {
        const departments = await sqlproxy.viewDepartment();
        console.table(departments);
        mainMenu();
    },
    "view all roles": async function () {
        const roles = await sqlproxy.viewRole();
        console.table(roles);
        mainMenu();
    },
    "view all employees": async function () {
        const employees = await sqlproxy.viewEmployees();
        console.table(employees);
        mainMenu();
    },
    "add a department": async function () {
        inquirer.prompt(
            {
                type: 'input',
                name: 'department-answers',
                message: 'What\'s your department\'s name?'
            }
        ).then(async (answer) => {
            await sqlproxy.addDepartment(answer["department-answers"]);
            mainMenu();
        });
    },
    "add a role": async function () {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role-title',
                message: 'What is the new role title?'
            }, {
                type: 'input',
                name: 'role-salary',
                message: 'What is the new role\'s salary?'
            },{
                type: 'input',
                name: 'role-department_id',
                message: 'What is the new role\'s department id?'
            }]
        ).then(async (answer) => {
            await sqlproxy.addRole(answer["role-title"] , answer["role-salary"], answer["role-department_id"]);
            mainMenu();
        });
    },
    "add an employee": async function () {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee-firstname',
                message: 'What is the new employee\'s first name?'
            }, {
                type: 'input',
                name: 'employee-lastname',
                message: 'What is the new employee\'s last name?'
            },{
                type: 'input',
                name: 'employee-manager_id',
                message: 'What is the new employee\'s manager id?'
            },{
                type: 'input',
                name: 'employee-role_id',
                message: 'What is the new employee\'s role id?'
            }]
        ).then(async (answer) => {
            await sqlproxy.addEmployee(answer["employee-firstname"],
             answer["employee-lastname"], answer["employee-manager_id"], answer["employee-role_id"]);
            mainMenu();
        });
    },
    "and update an employee role": async function () {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee-update',
                message: 'What is the ID of the employee you would like to update?'
            }, {
                type: 'input',
                name: 'employee-role-id-update',
                message: 'What is the new role ID?'
            }]
        ).then(async (answer) => {
            await sqlproxy.employeeRole(answer["employee-update"], answer["employee-role-id-update"]);
            mainMenu();
        });
    },

}

function mainMenu() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'Welcome-Message',
            message: 'What would you like to do?',
            choices: Object.keys(choiceActions),
        }).then((answer) => {
            const userAction = answer["Welcome-Message"];
            choiceActions[userAction]();
        });
};

mainMenu();
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
    "add a department": function () { },
    "add a role": function () { },
    "add an employee": function () { },
    "and update an employee role": function () { },
    
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
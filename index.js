const inquirer = require('inquirer')

const questions =[
    {
        type: 'list',
        message: 'Please make a selection. I want to..',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee', 'quit'],
        name: 'select'
    },
    {
        type: 'input',
        message: 'What is the Employees first name?',
        name: 'firstName',
        when(response) {
            return response.select === 'add an employee'
        }
    },
    {
        type: 'input',
        message: 'What is the Employees last name?',
        name: 'lastName',
        when(response) {
            return response.select === 'add an employee'
        }
    },
    {
        type: 'input',
        message: 'What is the Employees role?',
        name: 'empRole',
        when(response) {
            return response.select === 'add an employee'
        }
    },
    {
        type: 'input',
        message: 'Who is the Employees Manager?',
        name: 'empManager',
        when(response) {
            return response.select === 'add an employee'
        }
    },
    {
        type: 'input',
        message: 'What is the role title?',
        name: 'roleTitle',
        when(response) {
            return response.select === 'add a role'
        }
    },
    {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'roleSal',
        when(response) {
            return response.select === 'add a role'
        }
    },
    {
        type: 'input',
        message: 'What department does this role belong to?',
        name: 'roleDept',
        when(response) {
            return response.select === 'add a role'
        }
    },
    {
        type: 'input',
        message: 'What is the name of the Department?',
        name: 'deptName',
        when(response) {
            return response.select === 'add a department'
        }
    },
];

function init() {
    return inquirer.prompt(questions)
        .then((response) => {
            if (response.select === 'quit') {
                console.log("I'll miss you.")
            }
            else {
                init()
            };
    });
};

init()
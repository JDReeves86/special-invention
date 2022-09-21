const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const modules = require('./modules/modules.js');
const dbConnection = require('./modules/connect.js');

const questions = [
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
        type: 'list',
        message: 'What is the Employees role?',
        name: 'empRole',
        choices: modules.getJobTitles,
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
        // HOW DO I ASSOCIATE A NAME WITH AN EMP_ID??
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
        type: 'list',
        message: 'What department does this role belong to?',
        name: 'roleDept',
        choices: modules.getDeptNames,
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
            switch (response.select) {
                case 'quit':
                    console.log("I'll miss you.")
                    break;
                case 'view all departments':
                    modules.queryDept().then(([results]) => {
                        console.table(results)
                    });
                    init();
                    break;
                case 'view all roles':
                    modules.queryRoles().then(([results]) => {
                        console.table(results)
                    });
                    init();
                    break;
                case 'view all employees':
                    modules.queryEmployees().then(([results]) => {
                        console.table(results);
                    });
                    init();
                    break;
                case 'update an employee':
                    // need to query employee table to select and then edit their info... lol wut
                    console.log('update EMP');
                    // need to build inq questions for this??
                    break;
                default:
            };
            if (response.deptName) {
                dbConnection.query('INSERT INTO departments (dept_name) VALUES (?)', response.deptName, (err, results) => {
                    if (err) {throw err}
                });
                init();
                console.log('Department Added')
            };
            if (response.roleDept) {
                // const deptID = 
                dbConnection.query('SELECT id FROM departments WHERE dept_name = dog grooming', [response.roleDept], (err, results) => {
                    if (err) {console.log(err)}
                    console.log('results')
                });
                // query dept table select id from departments where dept_name == response.roledept <-- place into variable and place into insert statement
                // dbConnection.query(stuff above).then(stuff below)
                // dbConnection.query('INSERT INTO roles (job_title, dept_id, salary) VALUES (?, ?, ?)', response.roleTitle, response.roleDept, response.roleSal, (err, results) => {
                //     if (err) {throw err}
                // });
                init();
            };
            if (response.empManager) {
                // Need to pull dept_id and 
                // dbConnection.query('INSERT INTO employees (first_name, last_name, role_id, dept_id, manager) VALUES (?, ?, ?, ?, ?)', response.firstName, response.lastName, response.empRole, response.DEPARTMENT>?? response.empManager function (err, results) {
                //     console.log('Employee added!');
                // });
                init();
            };
    });
};

init()

// HOW TO WE EDIT AN EXISTING TABLE IN SQL??


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
        type: 'list',
        message: 'Who is the Employees Manager?',
        name: 'empManager',
        choices: modules.getManagers,
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

const updateQuestions =[
    {
        type: 'list',
        message: "Which employee's role would you like to edit?",
        choices: modules.getEmployees,
        name: 'pickEmp'
    },
    {
        type: 'list',
        message: 'What is the new role you wish to assign?',
        choices: modules.getJobTitles,
        name: 'newRole'
    }
]

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
                    updateEmployees();
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
                console.log('Department added!');
            };
            if (response.roleDept) {
                deptID = dbConnection.query('SELECT id FROM departments WHERE dept_name = ?', 
                [response.roleDept])
                .then(([results]) => {
                    return results[0].id
                });

                const getID = async () => {
                    const id = await deptID
                    dbConnection.query('INSERT INTO roles (job_title, dept_id, salary) VALUES (?, ?, ?)', [response.roleTitle, id, response.roleSal], (err, results) => {
                        if (err) {throw err}
                    });
                };

                getID();                
                init();
                console.log('Role added!');
            };
            if (response.empManager) {

                roleID = dbConnection.query('SELECT id FROM roles WHERE job_title = ?', 
                [response.empRole])
                .then(([results]) => {
                    return results[0].id
                });

                deptID = dbConnection.query('SELECT dept_id FROM roles WHERE job_title = ?', 
                [response.empRole])
                .then(([results]) => {
                    return results[0].dept_id
                });

                const managerName = response.empManager.split(' ')[0]

                managerID = dbConnection.query('SELECT id FROM employees WHERE first_name = ?', 
                [managerName])
                .then(([results]) => {
                    return results[0].id
                });

                const getID = async () => {
                    const promisedRoleID = await roleID;
                    const promisedDeptID = await deptID;
                    const promisedManagerID = await managerID;
                    dbConnection.query('INSERT INTO employees (first_name, last_name, role_id, dept_id, manager) VALUES (?, ?, ?, ?, ?)', [response.firstName, response.lastName, promisedRoleID, promisedDeptID, promisedManagerID], (err, results) => {
                        if (err) {throw err}
                    });
                };

                getID();
                init();
                console.log('Employee added!');
            };
    });
};

function updateEmployees() {
    return inquirer.prompt(updateQuestions)
        .then((response) => {
            roleID = dbConnection.query('SELECT id FROM roles WHERE job_title = ?', 
            [response.newRole])
            .then(([results]) => {
                return results[0].id
            });

            const empName = response.pickEmp.split(' ')[0];

            const getID = async () => {
                const promisedRoleID = await roleID;
                dbConnection.query('UPDATE employees SET role_id = ? WHERE first_name = ?', [promisedRoleID, empName], (err, results) => {
                    if (err) throw err
                })
            }
            getID();
            init();
    })
};

init()


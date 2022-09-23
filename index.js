const inquirer = require('inquirer');
const mysql = require('mysql2');
const modules = require('./modules/modules.js');
const dbConnection = require('./modules/connect.js');
const { printTable } = require('console-table-printer')

const questions = [
    {
        type: 'list',
        message: 'Please make a selection. I want to..',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Remove items', 'Quit'],
        name: 'select',
        loop: false
    },
    {
        type: 'input',
        message: 'What is the Employees first name?',
        name: 'firstName',
        when(response) {
            return response.select === 'Add an employee'
        }
    },
    {
        type: 'input',
        message: 'What is the Employees last name?',
        name: 'lastName',
        when(response) {
            return response.select === 'Add an employee'
        }
    },
    {
        type: 'list',
        message: 'What is the Employees role?',
        name: 'empRole',
        loop: false,
        choices: modules.getJobTitles,
        when(response) {
            return response.select === 'Add an employee'
        }
    },
    {
        type: 'list',
        message: 'Who is the Employees Manager?',
        name: 'empManager',
        loop: false,
        choices: modules.getManagers,
        when(response) {
            return response.select === 'Add an employee'
        }
        // HOW DO I ASSOCIATE A NAME WITH AN EMP_ID??
    },
    {
        type: 'input',
        message: 'What is the role title?',
        name: 'roleTitle',
        when(response) {
            return response.select === 'Add a role'
        }
    },
    {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'roleSal',
        when(response) {
            return response.select === 'Add a role'
        }
    },
    {
        type: 'list',
        message: 'What department does this role belong to?',
        name: 'roleDept',
        loop: false,
        choices: modules.getDeptNames,
        when(response) {
            return response.select === 'Add a role'
        }
    },
    {
        type: 'input',
        message: 'What is the name of the Department?',
        name: 'deptName',
        when(response) {
            return response.select === 'Add a department'
        }
    },
];

const updateQuestions = [
    {
        type: 'list',
        message: 'What would you like to edit?',
        choices: ['Employee role', "Employee's Manager"],
        name: 'decisions'
    },
    {
        type: 'list',
        message: "Which employee's manager would you like to edit?",
        choices: modules.getEmployees,
        name: 'pickEmpMan',
        when(response) {
            return response.decisions === "Employee's Manager"
        }
    },
    {
        type: 'list',
        message: 'Who is the new manager?',
        choices: modules.getEmployees,
        name: 'newMan',
        when(response) {
            return response.decisions === "Employee's Manager"
        }
    },
    {
        type: 'list',
        message: "Which employee's role would you like to edit?",
        choices: modules.getEmployees,
        name: 'pickEmp',
        when(response) {
            return response.decisions === 'Employee role'
        }
    },
    {
        type: 'list',
        message: 'What is the new role you wish to assign?',
        choices: modules.getJobTitles,
        name: 'newRole',
        when(response) {
            return response.decisions === 'Employee role'
        }
    }
];

const deleteQuestions = [
    {
        type: 'list',
        message: 'What would you like to remove?',
        choices: ['Employee'],
        name: 'delete'
    },
    {
        type: 'list',
        message: "Which employee would you like to remove?",
        choices: modules.getEmployees,
        name: 'fired',
        when(response) {
            return response.delete === "Employee"
        }
    },
    // {
    //     type: 'list',
    //     message: "Which department would you like to remove?",
    //     choices: modules.getDeptNames,
    //     name: 'dissolved',
    //     when(response) {
    //         return response.delete === "Department"
    //     }
    // },
    // {
    //     type: 'list',
    //     message: "Which role would you like to remove?",
    //     choices: modules.getJobTitles,
    //     name: 'layoff',
    //     when(response) {
    //         return response.delete === "Role"
    //     }
    // },

]

function init() {
    return inquirer.prompt(questions)
        .then((response) => {
            switch (response.select) {
                case 'Quit':
                    console.log("I'll miss you.")
                    process.exit();
                case 'View all departments':
                    modules.queryDept().then(([results]) => {
                        console.log('\n')
                        printTable(results)
                    });

                    init();
                    break;
                case 'View all roles':
                    modules.queryRoles().then(([results]) => {
                        console.log('\n')
                        printTable(results)
                    });

                    init();
                    break;
                case 'View all employees':
                    modules.queryEmployees().then(([results]) => {
                        console.log('\n')
                        printTable(results);
                    });

                    init();
                    break;
                case 'Update an employee':
                    updateEmployees();
                    break;
                case 'Remove items':
                    deleteStuff();
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
            if (response.newRole) {
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
            }
            if (response.newMan) {
                const managerName = response.newMan.split(' ')[0];
                const empName = response.pickEmpMan.split(' ')[0];

                managerID = dbConnection.query('SELECT id FROM employees WHERE first_name = ?', 
                [managerName])
                .then(([results]) => {
                    return results[0].id
                });

                const getID = async () => {
                    const promisedManID = await managerID;
                    dbConnection.query('UPDATE employees SET manager = ? WHERE first_name = ?', [promisedManID, empName], (err, results) => {
                        if (err) throw err
                    })
                }
                getID();
                init();

            }

    })
};

function deleteStuff() {
    return inquirer.prompt(deleteQuestions)
    .then((response) => {
        console.log(response)
        if (response.fired) {
            const empName = response.fired.split(' ')[0];
       
            dbConnection.query('DELETE FROM employees WHERE first_name = ?', [empName])

            init();
        };

        // VV  DOESN'T WORK BECAUSE FOPREIGN KEY CONSTRAINT FAILS??? TF DOES THAT MEAN?
       
        // if (response.dissolved) {
        //     console.log('dept removed')
        //     dbConnection.query('DELETE FROM departments WHERE dept_name = ?', [response.dissolved], (err, results) => {
        //         if (err) throw err
        //     })
        //     init();
        // }


        // if (response.layoff) {
       
        //     dbConnection.query('DELETE FROM roles WHERE job_title = ?', [response.layoff], (err, results) => {
        //             if (err) throw err
        //             })

        //     init();
        //     }
        // ^^ ALL THIS STUFF NO WORKIE...

    })
};

init();


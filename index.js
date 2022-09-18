const inquirer = require('inquirer')

const questions =[
    {
        type: 'list',
        message: 'Please make a selection. I want to..',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an aemployee'],
        name: 'select'
    },
    {
        
    }
]

function init() {
    return inquirer.prompt()
}
const dbConnection = require('./connect.js');
const mysql = require('mysql2');

const getJobTitles = async () => {
    const choices = await dbConnection.query('SELECT job_title FROM roles;');
    const res = choices[0]
    let arr = [];
    for (let i=0; i<res.length; i++) {
        arr.push(res[i].job_title)
    }
    return arr
}

const getDeptNames = async () => {
    const choices = await dbConnection.query('SELECT dept_name FROM departments;');
    const res = choices[0]
    let arr = [];
    for (let i=0; i<res.length; i++) {
        arr.push(res[i].dept_name)
    }
    return arr
};

const getManagers = async () => {
    const choices = await dbConnection.query('SELECT first_name, last_name FROM employees;');
    const res = choices[0]
    let arr = [];
    for (let i=0; i<res.length; i++) {
        arr.push(`${res[i].first_name} ${res[i].last_name}`)
    }
    return arr
};

const getEmployees = async () => {
    const choices = await dbConnection.query('SELECT first_name, last_name FROM employees;');
    const res = choices[0]
    let arr = [];
    for (let i=0; i<res.length; i++) {
        arr.push(`${res[i].first_name} ${res[i].last_name}`)
    }
    return arr
};

const queryDept = () => {
    return dbConnection.query('SELECT * FROM departments;')
};

const queryRoles = () => {
    return dbConnection.query('SELECT * FROM roles;')
};

const queryEmployees = () => {
    return dbConnection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.dept_name, roles.salary FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON departments.id=roles.dept_id;')
};

module.exports = {
    getJobTitles,
    getDeptNames,
    queryDept,
    queryRoles,
    queryEmployees,
    getManagers,
    getEmployees,
}
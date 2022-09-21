const dbConnection = require('./connect.js');
const mysql = require('mysql2');

const getJobTitles = async () => {
    const choices = await dbConnection.query('SELECT job_title FROM roles;');
    // const choices = await dbConnection.query('SELECT id AS value, job_title FROM roles;');
    console.log(choices[0])
    return choices[0]
}

const getDeptNames = async () => {
    const choices = await dbConnection.query('SELECT dept_name FROM departments;');
    const res = choices[0]
    let arr =[];
    for (let i=0; i<res.length; i++) {
        arr.push(res[i].dept_name)
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
    return dbConnection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, roles.salary, departments.dept_name FROM employees JOIN departments ON employees.dept_id=departments.id JOIN roles ON departments.id=roles.dept_id;')
};


module.exports = {
    getJobTitles,
    getDeptNames,
    queryDept,
    queryRoles,
    queryEmployees,

}
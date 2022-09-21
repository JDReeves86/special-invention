-- view all employees
SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.job_title, 
    roles.salary,
    departments.dept_name
FROM employees
JOIN departments
ON employees.dept_id=departments.id
JOIN roles
ON departments.id=roles.dept_id;

--  view all roles
SELECT * FROM roles;

--  view all departments
SELECT * FROM departments;
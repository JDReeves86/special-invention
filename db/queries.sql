-- view all employees
SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.job_title, 
    departments.dept_name,
    roles.salary,
    (SELECT employees.first_name, employees.last_name FROM employees WHERE employees.manager = employees.id),
FROM employees
JOIN roles
ON employees.role_id=roles.id
JOIN departments
ON departments.id=roles.dept_id;

-- --  view all roles
-- SELECT * FROM roles;

-- --  view all departments
-- SELECT * FROM departments;
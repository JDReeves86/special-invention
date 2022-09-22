SELECT CONCAT(last_name, ', ', first_name) AS manager_name
FROM employees
WHERE employees.manager = employees.id;

-- view all employees
SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.job_title, 
    departments.dept_name,
    roles.salary
FROM employees
JOIN roles
ON employees.role_id=roles.id
JOIN departments
ON departments.id=roles.dept_id

JOIN employees
SELECT CONCAT(last_name, ', ', first_name) 
AS manager_name 
FROM employees
WHERE employees.manager = employees.id

ON value 1 = manager_name

;




-- --  view all roles
-- SELECT * FROM roles;

-- --  view all departments
-- SELECT * FROM departments;
-- SELECT CONCAT(last_name, ', ', first_name) AS manager_name,
-- id AS man_id
-- FROM employees
-- WHERE employees.manager = employees.id
-- ;


-- SELECT CONCAT(last_name, ', ', first_name) AS manager_name,
--         id AS man_id
--         FROM employees AS man_table



SELECT 
    employees.id AS EID,
    employees.first_name,
    employees.last_name,
    roles.job_title, 
    departments.dept_name,
    roles.salary

FROM employees

LEFT JOIN roles
ON employees.role_id=roles.id

LEFT JOIN departments
ON departments.id=roles.dept_id

LEFT JOIN (
    SELECT CONCAT(last_name, ', ', first_name) AS manager_name,
    id AS man_id
    FROM employees AS man_table
    -- WHERE employees.manager = man_table.man_id
    ) AS emp

ON employees.manager=emp.man_id

;




-- view all employees
-- SELECT 
--     employees.id, 
--     employees.first_name, 
--     employees.last_name, 
--     roles.job_title, 
--     departments.dept_name,
--     roles.salary
    
-- FROM employees
-- JOIN roles
-- ON employees.role_id=roles.id
-- JOIN departments
-- ON departments.id=roles.dept_id
-- ;


-- --  view all roles
-- SELECT * FROM roles;

-- --  view all departments
-- SELECT * FROM departments;

-- select all employees
-- SELECT * from employees;




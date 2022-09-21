INSERT INTO departments (dept_name)
    VALUES 
        ('Accounting'),
        ('Sales');

INSERT INTO roles (job_title, dept_id, salary)
    VALUES
        ('Accountant', 1, 80000),
        ('Sales Person', 2, 100000);

INSERT INTO employees (first_name, last_name, role_id, dept_id, manager)
    VALUES
        ('Jacob', 'Reeves', 11, 2, 101),
        ('Freddy', 'Mercury', 11, 2, 101),
        ('James', 'Bond', 10, 1, 100),
        ('Mad', 'Max', 10, 1, 100);


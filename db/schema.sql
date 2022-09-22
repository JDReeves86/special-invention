DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(20) NOT NULL

);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    dept_id INT NOT NULL,
    salary INT NOT NULL,

    FOREIGN KEY (dept_id)
    REFERENCES departments(id)
);

ALTER TABLE roles AUTO_INCREMENT=10;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    role_id INT NOT NULL, 
    dept_id INT NOT NULL, 
    manager INT REFERENCES employees(id),

    FOREIGN KEY (dept_id)
    REFERENCES departments(id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

ALTER TABLE employees AUTO_INCREMENT=100;

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
        ('James', 'Bond', 10, 1, 100),
        ('Mad', 'Max', 10, 1, 100),
        -- ('Han', 'Solo', 11, 2, 102),
        -- ('John', 'Connor', 11, 2, 102);
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
        ('Law Enforcement'),
        ('War Mongering');

INSERT INTO roles (job_title, dept_id, salary)
    VALUES
        ('Vigilante', 1, 80000),
        ('Chieftan', 2, 100000),
        ('Warrior of the Wastes', 2, 500000),
        ('Enforcer', 2, 5000);

INSERT INTO employees (first_name, last_name, role_id, dept_id, manager)
    VALUES
        ('Max', 'Rockatansky', 10, 1, 100),
        ('Toe', 'Cutter', 11, 2, 101),
        ('Lord', 'Humungus', 12, 2, 102),
        ('Auntie', 'Entity', 11, 2, 103),
        ('Master', 'Blaster', 13, 2, 103),
        ('Immortan', 'Joe', 11, 2, 105),
        ('Imperator', 'Furiosa', 10, 1, 106);
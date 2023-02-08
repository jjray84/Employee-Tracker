DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employ_list (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first-name VARCHAR(30) NOT NULL,
    last-name VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(20) NOT NULL,
    salary INT NOT NULL
    manager VARCHAR(30)
)
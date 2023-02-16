USE employee_db;
INSERT INTO departments (department)
VALUES ('Sales'),
       ('Engineer'),
       ('Finance'),
       ('Legal'); 


INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 75000, 1),
       ('Lead Engineer', 100000, 2),
       ('Engineer', 75000, 2),
       ('Account Manager', 100000, 3),
       ('Accountant', 75000, 3),
       ('Legal Lead', 100000, 4),
       ('Legal', 75000, 4); 

INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUES (1, "John", "Smith", null),
       (2, "Martin", "Heusmann", 1), 
       (3, "Ed", "McCarthy", null),
       (4, "Tashi", "Okamura", 3),
       (5, "Joe", "Blake", null),
       (6, "Frank", "Frink", 5),
       (7, "Juliana", "Crane", null),
       (8, "Nobusuke", "Tagomi", 7);
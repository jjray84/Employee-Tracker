const inquirer = require("inquirer");
const db = require("./config/config");
require('console.table');

let questions = () => {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'MenuAnswer',
            message: 'What would you like to do?',
            choices: [
                'View all employees', 
                'Add employee', 
                'Update employee role', 
                'View all roles', 
                'Add role', 
                'View all departments',
                'Add department',
                'Quit', 
            ]

        }
    ])
    .then(({ MenuAnswer }) => {
        if(MenuAnswer == 'View all employees') {
            viewEmployees();
        } else if (MenuAnswer == 'Add employee') {
            addEmployee();
        } else if (MenuAnswer == 'Update employee role') {
            updateEmployeeRole();
        } else if (MenuAnswer == 'View all roles') {
            viewAllRoles();
        } else if (MenuAnswer == 'Add role') {
            addRole();
        } else if (MenuAnswer == 'View all departments') {
            viewAllDepartments();
        } else if (MenuAnswer == 'Add department') {
            addDepartment();
        } else {
            process.exit();
        }
    })
};

function viewEmployees() {
    db.promise().query(`select employees.id, 
employees.first_name, 
employees.last_name, 
roles.title, 
roles.salary, 
concat(manager.first_name, ' ', manager.last_name) as manager_name 

from departments 
join roles on departments.id = roles.department_id 
join employees on roles.id = employees.role_id 
left join employees as manager on employees.manager_id = manager.id;`)
.then(data => {
    console.table(data[0]);
    questions();
})
};

function viewAllDepartments() {
    db.promise().query(`
    SELECT * FROM departments`)
.then(data => {
    console.table(data[0]);
    questions();
    })
};

function viewAllRoles() {
    db.promise().query(`
    SELECT roles.id, title, salary, department from roles left join departments 
    on roles.department_id = departments.id;`)
.then(data => {
    console.table(data[0]);
    questions();
    })
};

function addEmployee(){
    db.promise().query(
        `SELECT  id, CONCAT(first_name, ' ', last_name) AS full_name
        FROM employees;`
    ).then(empData => {
        const all_employees = empData[0].map(e => {
            return  {
                name:e.full_name,
                value:e.id
            }
        })
        db.promise().query(
            `SELECT id, title
            FROM roles;`
        ).then(roleData => {
            const all_roles = roleData[0].map(r => {
                return  {
                    name:r.title,
                    value:r.id
                }
            })
            addEmployeeQuestions(all_employees, all_roles);
        })
    })
}

function updateEmployeeRole() {
    db.promise()
        .query(
        `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees;`
        )
        .then((employeeData) => {
        const allEmployees = employeeData[0].map((employee) => {
            return {
            name: employee.full_name,
            value: employee.id,
            };
        });

        db.promise()
            .query(`SELECT id, title FROM roles;`)
            .then((roleData) => {
            const allRoles = roleData[0].map((role) => {
                return {
                name: role.title,
                value: role.id,
                };
            });

        inquirer
            .prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee's role do you want to update?",
                choices: allEmployees,
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employee's new role?",
                choices: allRoles,
            },
            ])
            .then((answers) => {
            db.promise()
                .query(
                `UPDATE employees SET role_id = ? WHERE id = ?`,
                [answers.role_id, answers.employee_id]
                )
                .then(() => {
                console.log("Employee role updated!");
                questions();
                })
                .catch((err) => {
                console.log(err);
                });
            });
        });
    });
}

function addRole() {
    db.promise()
        .query(`SELECT id, name FROM departments;`)
        .then((deptData) => {
        const allDepartments = deptData[0].map((department) => {
            return {
            name: department.name,
            value: department.id,
            };
        });

    inquirer
        .prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?",
            validate: function (value) {
            const valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
            },
            filter: Number,
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does the new role belong to?",
            choices: allDepartments,
        },
        ])
        .then((answers) => {
        db.promise()
            .query(
            `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
            [answers.title, answers.salary, answers.department_id]
            )
            .then(() => {
            console.log("New role added!");
            questions();
            })
            .catch((err) => {
            console.log(err);
            });
        });
    });
}
  
let addEmployeeQuestions = (allEmployees, allRoles) => {
    inquirer
    .prompt ([
        { 
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
            
        },
        { 
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",

        },
        {
            type: 'list',
            name: 'role_answer',
            message: "What is the Employee's role?",
            choices: allRoles
        },
        {
            type: 'list',
            name: 'manager_answer',
            message: "What is the Employee's manager?",
            choices: allEmployees
        }
    ])
    .then(newEmp => {
        db.promise().query(
            `
            INSERT INTO employees (role_id, first_name, last_name, manager_id)
            VALUES (${newEmp.role_answer}, '${newEmp.first_name}', '${newEmp.last_name}', ${newEmp.manager_answer})
            `
        ).then(resp => {
            console.log("ädded employee");
            questions()
        })
    })
}


let employeeRoleQuestions = async() => {
    db.promise().query(`SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees;`)
    .then(employeeData => {
        const employees = employeeData[0].map(e => {
            return  {
                name: e.full_name,
                value: e.id
            }
        })
        db.promise().query(`SELECT id, title FROM roles;`)
        .then(roleData => {
            const roles = roleData[0].map(r => {
                return  {
                    name: r.title,
                    value: r.id
                }
            })
            inquirer
            .prompt ([
                {
                    type: 'list',
                    name: 'employee_answer',
                    message: "Which employees' role would you like to update?",
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'update_role_answer',
                    message: "What would you like their new role to be?",
                    choices: roles
                }
            ])
            .then(updateEmp => {
                db.promise().query(`UPDATE employees SET role_id = ${updateEmp.update_role_answer} WHERE id = ${updateEmp.employee_answer};`)
                .then(resp => {
                    console.log(`Employee role has been updated`);
                    questions();
                })
            })
        })
    })
}

let init = () => {
    let greeting = `
    __________________
    
    Employee Manager
    __________________
    `
    console.log(greeting);
    questions();
}

init();
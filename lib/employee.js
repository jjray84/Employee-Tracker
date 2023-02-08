class Employee {
    constructor(id, firstName, lastName, title, department, salary, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }

    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getTitle() {
        return this.title;
    }

    getDepartment() {
        return this.department;
    }

    getSalary() {
        return this.salary;
    }

    getManager() {
        return this.manager;
    }
};

module.exports = Employee;
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');


const saveFolder = path.resolve(__dirname, 'dist');
const savePath = path.join(saveFolder);

function menu() {
    inquirer.createPromptModule([
        {
            type: 'list',
            mssage: 'What type of employee would you like to add?',
            choices: ['Manager', 'Engineer', 'Finance', 'Legal', 'Sales'],
            name: 'employee'
        }
    ])
}
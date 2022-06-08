const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir \n`
            },
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log(' Seleccione una opcion'.white);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt( questions );
    return option

};

const pause = async() => {

    console.log('\n');
    await inquirer.prompt([ 
        {
            type: 'input',
            name: 'input',
            message: `Presione ${ 'ENTER'.green } para continuar\n`
        }
    ]);

};

const readInput = async(message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if( value.length === 0 ){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }]

    const { desc } = await inquirer.prompt( question );
    return desc;

}

const deleteTaskList = async( tasks = []) => {

    const choices = tasks.map( (task, i) => {

        const index = `${i + 1}.`.green;

        return {
            value: task.id,
            name: `${index} ${task.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: `Delete`,
            choices
        }
    ];

    const { id } = await inquirer.prompt( question );
    return id;
};

const confirm = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;

};

const showTaskCheckList = async( tasks = []) => {

    const choices = tasks.map( (task, i) => {

        const index = `${i + 1}.`.green;

        return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: task.completedOn ? true : false
        }

    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: `Seleccione`,
            choices
        }
    ];

    const { ids } = await inquirer.prompt( question );
    return ids;
};

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    showTaskCheckList,
    confirm
}
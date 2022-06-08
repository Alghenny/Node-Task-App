require('colors');

const {
        inquirerMenu,
        pause,
        readInput,
        deleteTaskList,
        confirm,
        showTaskCheckList
} = require('./helpers/inquirer');

const { saveFile, readFile } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

console.clear();

const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const taskFile = readFile();

    if (taskFile) {
        tasks.loadTaskFromFile(taskFile);
    }

    do {
       opt = await inquirerMenu();
       
        switch ( opt ) {
            case '1':
                const desc = await readInput('Descripción:');
                tasks.createTask( desc );
            break;
            
            case '2':
                tasks.completeList();
            break;
            
            case '3':
                tasks.pendingCompletedList(true);
            break;

            case '4':
                tasks.pendingCompletedList(false);
            break;

            case '5':
                const ids = await showTaskCheckList(tasks.listArr);
                tasks.toggleCompleted( ids );
            break;

            case '6':
                const id = await deleteTaskList( tasks.listArr);
                if ( id !=='0' ) {
                    const ok = await confirm('Estás seguro?');
                    if(ok) {
                        tasks.deleteTask( id );
                        console.log('Tarea borrada');
                    }
                }
            break;

            default:
                break;
        }

        saveFile( tasks.listArr );

       if( opt !== '0') await pause();

    } while ( opt !== '0');

}

main()
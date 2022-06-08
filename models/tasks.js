const Task = require('./task');

class Tasks {

    _list = {};

    get listArr() {

        const list = [];
        Object.keys(this._list).forEach( key => {
            list.push( this._list[key] );
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '' ){
        if ( this._list[id] ) {
            delete this._list[id];
        }
    }

    loadTaskFromFile( tasks = []) {

        tasks.forEach( task => {
            this._list[task.id] = task;
        })

    }

    createTask( desc = '' ) {

        const task =  new Task( desc );
        this._list[task.id] = task;

    }

    completeList() {

        const lists = this.listArr;

        console.log('\n');


        lists.forEach( (list, i) => {

            const index = `${i + 1}.`.green;
            const { desc, completedOn } = list;

            const status =  completedOn ? 'Completada'.green : 'Pendiente'.red

            console.log( `${index} ${desc} :: ${status}` );
        })
        
    }
    
    pendingCompletedList(completed = true) {
        
        const lists = this.listArr;
    
        console.log('\n');
        let contador = 0;

        lists.forEach( (list, i) => {

            const { desc, completedOn } = list;
            const status = 'Pendiente'.red

            if (completed) {
                if(completedOn) {
                    contador +=1;
                    console.log( `${ (contador + '.').green } ${desc} :: ${completedOn.green}` );
                }
            } else {
                if(!completedOn){
                    contador +=1;
                    console.log( `${ (contador + '.').green } ${desc} :: ${status}` );
                }
            }


        })

    }

    toggleCompleted( ids = [] ) {

        ids.forEach( id => {

            const task = this._list[id];
            if( !task.completedOn ) {
                task.completedOn = new Date().toUTCString();
            }

        })

        this.listArr.forEach( task => {

            if( !ids.includes(task.id) ){
                this._list[task.id].completedOn = null;
            }

        })

    }

}

module.exports = Tasks;
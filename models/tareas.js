const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    // console.log(tareas.listadoArr);
    get listadoArr() {

        const listado = [];
        // extrae los datos de un array por cada key
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            // insertamos la tarea obenida por el key
            listado.push( tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    // METODOS

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []) {

        tareas.forEach(( tarea ) => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '') {

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

     this.listadoArr.forEach( ( tarea, i ) => {

        // extraer el indice ( i) e incrmentar en 1 
        const idx = `${ i + 1 }`.blue;
        // descetructuramos tarea y extraemos la desc y completadoEn 
        const { desc, completadoEn } = tarea;

        const estado = (completadoEn )
                            ? ( 'Completada'.blue)
                            : ( 'Pendiente'.red)

        console.log(`${idx}. ${desc} :: ${estado}`)
     });

    }

    listaPendientesCompletadas( completadas = true ) {

        let count = 0;
        this.listadoArr.forEach( (tarea, i ) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn )
                            ? ( 'Completada'.blue)
                            : ( 'Pendiente'.red)

            if(completadas) {
                if( completadoEn ) {
                    count += 1; 
                    console.log(`${(count + '.')} ${desc} :: Fecha:${completadoEn}`);
                }
            } else {
               if( !completadoEn ) {
                    count += 1; 
                    console.log(`${(count + '.')} ${desc} :: Fecha: ${estado}`);
                }
            }

            
        })

    }
    toogleCompletadas( ids = [] ) {

        ids.forEach( id => {
            
            const tarea = this._listado[id]
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas;
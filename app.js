require('colors');
const { guardarDB, leerDB } = require('./helpers/guardaArchivo');
const { 
        inquirerMenu, 
        pausaMenu, 
        leerInput,
        borrarListadoTarea,
        confirmar,
        mostrarCheckList
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


console.clear();

const main = async() => {

    let opt = '';
    // creamos la instacia de tareas 
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if( tareasDB ) {
        // TODO: cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch(opt){
            case '1': 
                // leer opcion
                const desc = await leerInput('Descripción');
                tareas.crearTarea( desc );
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listaPendientesCompletadas(true);
            break;

            case '4': 
                tareas.listaPendientesCompletadas(false);
            break;

            case '5':
               const ids = await mostrarCheckList( tareas.listadoArr);
               tareas.toogleCompletadas(ids)
            break;
            // Borrar 
            case '6':
                const id = await borrarListadoTarea( tareas.listadoArr );
                if( id !== '0') {
                    // TODO confirmacion
                    const ok = await confirmar(' ¿Desea borrar esta Tarea?' );
                    if( ok ) {
                        tareas.borrarTarea( id );
                        console.log('||      Tarea borrada!! :c       ||'); 
                    }
                }
                
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausaMenu();

    } while( opt !== '0' );

}

main();
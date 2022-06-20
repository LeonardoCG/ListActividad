const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {

    console.clear();
    console.log('=================================='.blue);
    console.log('       Seleccione una opción:      '.bgMagenta)
    console.log('==================================\n'.blue);

    console.log('=================================='.blue);  
    console.log(`|| ${'1.'.green} Crear Tareas              ||`);
    console.log(`|| ${'2.'.green} Listar Tareas             ||`);
    console.log(`|| ${'3.'.green} Listar Tereas completadas ||`);
    console.log(`|| ${'4.'.green} Listar Tareas Pendites    ||`);
    console.log(`|| ${'5.'.green} Completar Tarea(s)        ||`);
    console.log(`|| ${'6.'.green} Borrar Tarea              ||`);
    console.log(`|| ${'0.'.green} salir                     ||`);
    console.log('==================================\n'.blue);

        // interfaz de usuario 
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción', ( opt ) => {
            readline.close();
            resolve(opt)
        });
    });
}

const pausa = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Precione ${'ENTER'.green} para continuar`, ( opt ) => {
            readline.close();
            resolve();
        });

    });
}


module.exports = {
    mostrarMenu,
    pausa
}
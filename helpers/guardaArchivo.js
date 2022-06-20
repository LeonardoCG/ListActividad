const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerDB = () => {

    if( !fs.existsSync( archivo )) {
        return null
    }

    // leemos si existe el archivo y recibimos con string 
    const info = fs.readFileSync( archivo, { encoding: 'utf-8'} );
    // convertimos el archivo leido a json 
    const data = JSON.parse( info );

    return data;

}

module.exports = {
    guardarDB,
    leerDB
};
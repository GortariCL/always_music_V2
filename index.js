const { Pool } = require('pg');
const argumento = process.argv.slice(2);

let tipoFuncion = argumento[0];
let nombre = argumento[1];
let rut = argumento[2];
let curso = argumento[3];
let nivel = argumento[4];

//Requerimiento 1
const config = {
    user: "postgres",
    host: "localhost",
    password: "Feer1985",
    database: "always_music",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
}

const pool = new Pool(config);

//Requerimiento 2
const nuevo = async () => {
    pool.connect(async (error_conexion, client, release) => {
        //requerimiento 5
        if (error_conexion) {
            //requerimiento 6
            return console.log(error_conexion.code);
        }
        try {
            const objJSON_SQLQuery = {
                name: 'consulta_nuevo',
                rowMode: 'array',
                //Requerimiento 3
                text: 'INSERT INTO alumnos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;',
                values: [nombre, rut, curso, nivel]
            }
            const res = await client.query(objJSON_SQLQuery);
            //requerimiento 7
            console.log(res.rows);
        } catch (error_consulta) {
            console.log(error_consulta.code);
        }
        //Requerimiento 4
        release();
    });
};

//Requerimiento 2
const consRut = async () => {
    pool.connect(async (error_conexion, client, release) => {
        //requerimiento 5
        if (error_conexion) {
            //requerimiento 6
            return console.log(error_conexion.code);
        }
        try {
            const objJSON_SQLQuery = {
                name: 'consulta_rut',
                rowMode: 'array',
                //Requerimiento 3
                text: `SELECT * FROM alumnos WHERE rut = $1;`,
                values: [`${argumento[1]}`]
            }
            const res = await client.query(objJSON_SQLQuery);
            //requerimiento 7
            console.log(res.rows);
        } catch (error_consulta) {
            console.log(error_consulta.code);
        }
        //Requerimiento 4
        release();
    });
};

//Requerimiento 2
const consulta = async () => {
    pool.connect(async (error_conexion, client, release) => {
        //requerimiento 5
        if (error_conexion) {
            //requerimiento 6
            return console.log(error_conexion.code);
        }
        try {
            const objJSON_SQLQuery = {
                name: 'consulta_total',
                rowMode: 'array',
                //Requerimiento 3
                text: `SELECT * FROM alumnos;`
            }
            const res = await client.query(objJSON_SQLQuery);
            //requerimiento 7
            console.log('Registro actual ', res.rows);
        } catch (error_consulta) {
            console.log(error_consulta.code);
        }
        //Requerimiento 4
        release();
    });
};

//Requerimiento 2
const editar = async () => {
    pool.connect(async (error_conexion, client, release) => {
        //requerimiento 5
        if (error_conexion) {
            //requerimiento 6
            return console.log(error_conexion.code);
        }
        try {
            const objJSON_SQLQuery = {
                name: 'consulta_editar',
                rowMode: 'array',
                //Requerimiento 3
                text: `UPDATE alumnos SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE rut = $2`,
                values: [nombre, rut, curso, nivel]
            }
            await client.query(objJSON_SQLQuery);
            //requerimiento 7
            console.log(`Estudiante '${nombre}' editado con éxito`);
        } catch (error_consulta) {
            console.log(error_consulta.code);
        }
        //Requerimiento 4
        release();
    });
};

//Requerimiento 2
const eliminar = async () => {
    pool.connect(async (error_conexion, client, release) => {
        //requerimiento 5
        if (error_conexion) {
            //requerimiento 6
            return console.log(error_conexion.code);
        }
        try {
            const objJSON_SQLQuery = {
                name: 'consulta_eliminar',
                rowMode: 'array',
                //Requerimiento 3
                text: `DELETE FROM alumnos WHERE rut = $1`,
                values: [`${argumento[1]}`]
            }
            await client.query(objJSON_SQLQuery);
            //requerimiento 7
            console.log(`Registro de estudiante con rut: ${argumento[1]} eliminado`);
        } catch (error_consulta) {
            console.log(error_consulta.code);
        }
        //Requerimiento 4
        release();
    });
};

const ejecutarFuncion = async () => {
    if (tipoFuncion == 'nuevo') {
        try {
            await nuevo();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'consRut') {
        try {
            await consRut();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'consulta') {
        try {
            await consulta();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'editar') {
        try {
            await editar();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'eliminar') {
        try {
            await eliminar();
        } catch (err) {
            console.log('Error: ', err);
        }
    }
    pool.end();
}

ejecutarFuncion()
CREATE DATABASE always_music;

CREATE TABLE alumnos(
    nombre VARCHAR (50) NOT NULL,
    rut VARCHAR(12) PRIMARY KEY,
    curso VARCHAR (50) NOT NULL, 
    nivel SMALLINT NOT NULL
);
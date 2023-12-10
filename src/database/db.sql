/*  src/database/bd.sql  */


CREATE DATABASE accesorios

USE accesorios;



CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);
SELECT * from usuarios;

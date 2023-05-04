CREATE DATABASE SistemaDePiezas;

CREATE TABLE `SistemaDePiezas`.`Piezas` (
    `id`            INT NOT NULL AUTO_INCREMENT,
    `material`      VARCHAR(50),
    `peso`          INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
);

CREATE TABLE `SistemaDePiezas`.`PiezasLinker` (
    `id_pieza`      INT NOT NULL,
    `id_componente` INT NOT NULL
);

CREATE TABLE `SistemaDePiezas`.`Procesos` (
    `id`              INT NOT NULL AUTO_INCREMENT,
    `id_pieza_salida` INT NOT NULL,
    `tipo`            VARCHAR(50),
    PRIMARY KEY(`id`)
);

CREATE TABLE `SistemaDePiezas`.`Usuarios` (
    -- `id`         INT NOT NULL AUTO_INCREMENT ,
    `name`     VARCHAR(50)   NOT NULL,
    `password` VARCHAR(1000) NOT NULL,
    `salt`     VARCHAR(1000)   NOT NULL,
    PRIMARY KEY(`name`)
);



/*
INSERT INTO `SistemaDePiezas`.`Usuarios` 
    (name, password, salt)
VALUES
    ("Clodomiro", "contrasenaSinHashearDePrueba","abcdefghij"),
    ("juan", "contrasenaSinHashearDePrueba2",    "jihgfedcba")
;*/
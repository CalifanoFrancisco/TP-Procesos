CREATE DATABASE sistemaPiezas;
-- USE sistemaPiezas;

CREATE TABLE `sistemaPiezas`.`Piezas` (
    `id`            INT NOT NULL AUTO_INCREMENT,
    `material`      VARCHAR(50),
    `peso`          INT NOT NULL DEFAULT 0
    PRIMARY KEY (`id`)
);

CREATE TABLE `sistemaPiezas`.`PiezasLinker` (
    `id_pieza`      INT NOT NULL,
    `id_componente` INT NOT NULL
);

CREATE TABLE `sistemaPiezas`.`Procesos` (
    `id`              INT NOT NULL AUTO_INCREMENT,
    `id_pieza_salida` INT NOT NULL,
    `tipo`            VARCHAR(50),
    PRIMARY KEY(`id`)
);

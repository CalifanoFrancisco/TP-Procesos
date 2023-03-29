INSERT INTO `sistemaPiezas`.`Piezas` 
    (`material`)
VALUES
    ('rueda'),
    ('acero'),
    ('goma')
;

INSERT INTO `sistemaPiezas`.`PiezasLinker`
    (`id_pieza`, `id_componente`)
VALUES
-- rueda(1) esta hecha de acero(2) y goma(3)
    (1, 2),
    (1, 3)
;

INSERT INTO `sistemaPiezas`.`Procesos` 
    ( `id_pieza_salida`, `tipo`)
VALUES
    (1, 'ensamble')
;
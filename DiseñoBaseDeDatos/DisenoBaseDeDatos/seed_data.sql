INSERT INTO `SistemaDePiezas`.`Piezas` 
    (`material`)
VALUES
    ('rueda', 10),
    ('acero', 20),
    ('goma', 30)
;

INSERT INTO `SistemaDePiezas`.`PiezasLinker`
    (`id_pieza`, `id_componente`)
VALUES
-- rueda(1) esta hecha de acero(2) y goma(3)
    (1, 2),
    (1, 3)
;

INSERT INTO `SistemaDePiezas`.`Procesos` 
    ( `id_pieza_salida`, `tipo`)
VALUES
    (1, 'ensamble')
;

-- Para ver que piezas de entrada se necesitan para una pieza
SELECT * FROM Piezas 
WHERE id IN (
    SELECT id_componente FROM PiezasLinker 
    WHERE  id_pieza = (
        SELECT id_pieza_salida FROM Procesos 
        WHERE  id_pieza_salida = 1 --<userInput(id)>
    )
);

-- Materiales de los que esta compuesto una pieza
SELECT * FROM Piezas 
WHERE id IN (
    SELECT id_componente FROM PiezasLinker
    WHERE id_pieza = 1 --userInput
);

-- Saber el output de un proceso
SELECT * FROM Piezas 
WHERE id = (
    SELECT id_pieza_salida FROM Procesos
    WHERE  id = 1 --userInput
);

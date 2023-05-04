CREATE USER 'PiezasManager'@'localhost' IDENTIFIED BY 'shiro_gaming';

GRANT ALL PRIVILEGES ON SistemaDePiezas.* TO 'PiezasManager'@'localhost';

flush privileges;
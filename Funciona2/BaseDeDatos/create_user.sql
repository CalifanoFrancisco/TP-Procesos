CREATE USER 'PiezasManager'@'localhost' IDENTIFIED BY 'shiro_gaming';

GRANT ALL PRIVILEGES ON teams_system.teams TO 'PiezasManager'@'localhost';


flush privileges;
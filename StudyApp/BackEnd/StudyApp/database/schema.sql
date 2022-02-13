DROP DATABASE IF EXISTS StudyApp;
CREATE DATABASE StudyApp;
USE StudyApp;

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL, 
    device_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
CREATE TABLE percorsi_effettuati(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    nome VARCHAR(256) NOT NULL,
    minuti INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    PRIMARY KEY(id)
)
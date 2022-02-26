CREATE TABLE users(
    device_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(device_id)
);
CREATE TABLE percorsi_effettuati(
    id INT AUTO_INCREMENT NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    nome VARCHAR(256) NOT NULL,
    minuti INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(device_id),
    PRIMARY KEY(id)
)
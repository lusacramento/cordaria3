create table settings(
    id VARCHAR(255) NOT NULL,
    counter INT NOT NULL,
    instrument ENUM('ACOUSTIC-GUITAR', 'ELETRIC-GUITAR', 'BASS', 'CAVACO') NOT NULL,
    theme ENUM('LIGHT', 'DARK') NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id) REFERENCES user(email)
);
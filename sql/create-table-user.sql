use cordaria;
create table user(
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    user VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(email),
    UNIQUE KEY(user)
);
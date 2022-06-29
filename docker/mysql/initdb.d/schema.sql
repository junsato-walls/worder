CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    age INT,
    PRIMARY KEY (id)
);

CREATE TABLE menus (
    id INT NOT NULL AUTO_INCREMENT,
    category_id INT,
    menu VARCHAR(30) NOT NULL,
    price INT,
    view_no INT,
    visible_st TINYINT,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    menu_id INT,
    seat_id INT,
    price INT,
    order_st TINYINT,
    bill_st TINYINT,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(15),
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE seats (
    id INT NOT NULL AUTO_INCREMENT,
    seat VARCHAR(20),
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);
INSERT INTO user (name, age) VALUES ("太郎", 15);
INSERT INTO user (name, age) VALUES ("次郎", 18);
INSERT INTO user (name, age) VALUES ("花子", 20);

INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (1,"カレー", 850,1,1,CURRENT_DATE());
INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (1,"ラーメン", 920,2,1,CURRENT_DATE());
INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (1,"炒飯", 680,3,1,CURRENT_DATE());
INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (2,"サラダ", 480,4,1,CURRENT_DATE());
INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (3,"コーラ", 350,5,1,CURRENT_DATE());
INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (3,"ジンジャエール", 350,6,1,CURRENT_DATE());
INSERT INTO menus (category_id, menu, price, view_no, visible_st, created_at) VALUES (3,"ウーロン茶", 350,7,1,CURRENT_DATE());

INSERT INTO categories (category, created_at) VALUES ("食べ物", CURRENT_DATE());
INSERT INTO categories (category, created_at) VALUES ("一品物", CURRENT_DATE());
INSERT INTO categories (category, created_at) VALUES ("ドリンク", CURRENT_DATE());

INSERT INTO orders (menu_id, price, seat_id, order_st, bill_st, created_at) 
VALUES (1,850,1,0,0,CURRENT_DATE());
INSERT INTO orders (menu_id, price, seat_id, order_st, bill_st, created_at) 
VALUES (2,920,1,1,0,CURRENT_DATE());
INSERT INTO orders (menu_id, price, seat_id, order_st, bill_st, created_at) 
VALUES (3,680,2,0,1,CURRENT_DATE());
INSERT INTO orders (menu_id, price, seat_id, order_st, bill_st, created_at) 
VALUES (4,480,3,1,1,CURRENT_DATE());

INSERT INTO seats (seat, created_at) VALUES ("B1", CURRENT_DATE());
INSERT INTO seats (seat, created_at) VALUES ("B2", CURRENT_DATE());
INSERT INTO seats (seat, created_at) VALUES ("B3", CURRENT_DATE());
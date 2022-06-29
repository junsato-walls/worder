# -*- coding: utf-8 -*-
# モデルの定義
from sqlalchemy import Column, Integer, String, Integer,text
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from pydantic import BaseModel
from db import Base
from db import ENGINE

# サンプル
# userテーブルのモデルUserTableを定義
class UserTable(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    age = Column(Integer)


# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class User(BaseModel):
    id: int
    name: str
    age: int
    
# Worder ################################################################
# メニューテーブルのモデル定義
class MenuTable(Base):
    __tablename__ = 'menus'
    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer, nullable=False)    
    menu = Column(String(30), nullable=False)
    price = Column(Integer, nullable=False)
    view_no = Column(Integer, nullable=False)
    visible_st = Column(Integer, nullable=False)
    created_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp on update current_timestamp'))


# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Menu(BaseModel):
    id: int
    category_id: int
    menu:str
    price: int
    view_no: int    
    visible_st: int
    created_at: str
    updated_at:str

# 注文テーブルのモデル定義
class OrderTable(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, autoincrement=True)
    menu_id = Column(Integer, nullable=False)
    seat_id = Column(String(6), nullable=False)    
    price = Column(Integer, nullable=False)
    order_st = Column(Integer, nullable=False)
    bill_st = Column(Integer, nullable=False)
    created_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp on update current_timestamp'))
    
# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Order(BaseModel):
    id: int
    menu_id: int    
    seat_id:str
    price: int
    order_st: int
    bill_st: int
    created_at: str
    updated_at: str
    
class CategoryTable(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String(15), nullable=False)
    created_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp on update current_timestamp'))
    
# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Category(BaseModel):
    id: int
    category: str
    created_at: str
    updated_at: str
    
class SeatTable(Base):
    __tablename__ = 'seats'
    id = Column(Integer, primary_key=True, autoincrement=True)
    seat = Column(String(15), nullable=False)
    created_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp on update current_timestamp'))
    
# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Seat(BaseModel):
    id: int
    seat: str
    created_at: str
    updated_at: str
    
    
def main():
    # テーブルが存在しなければ、テーブルを作成
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()

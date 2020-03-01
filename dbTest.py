from flask import g
import sqlite3
import os
dbpath = os.getcwd() + '/sqlite/video.db'
import psycopg2
from psycopg2.extras import DictCursor


################### database test with local sqlite3 ##############
# def connect_db(RowMode=True):

#     sql = sqlite3.connect(dbpath)
#     if RowMode:
#         sql.row_factory = sqlite3.Row
#     else:
#         sql.row_factory = lambda cursor, row: row[0]
#     return sql

# def get_db():
#     if not hasattr(g, 'sqlite3_db'):
#         g.sqlite_db = connect_db()
#     return g.sqlite_db
######################################3
# uri = 'postgres://akgcifdgdtmrcr:398c7cc6e155be2de752862eabc76b499ccd371fb5d56c9fd1f1206dde92f027@ec2-174-129-253-27.compute-1.amazonaws.com:5432/dfrlhaubninha5'

filename = 'DataCollection.sql'

def connect_db(RowMode=True):
    # conn = psycopg2.connect(uri, cursor_factory = DictCursor)

    conn = psycopg2.connect(host="localhost",database="postgres", user="postgres", password="postgres")
    conn.autocommit = True
    sql = conn.cursor()
    return conn, sql

def get_db():
    db = connect_db()

    if not hasattr(g, 'postgres_db_conn'):
        g.postgres_db_conn = db[0]
    if not hasattr(g, 'postgres_db_cur'):
        g.postgres_db_cur = db[1]

    return g.postgres_db_cur

def init_db():
    db = connect_db()

    db[1].execute(open(filename,'r').read())
    db[1].close()

    db[0].close()


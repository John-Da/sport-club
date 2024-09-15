import sqlite3 as sql
from members import members_list

DATABASE = "databases/petanque.db"

def create_table():
    try:
        conn = sql.connect(DATABASE)
        curs = conn.cursor()  
        curs.execute(
            f"""CREATE TABLE IF NOT EXISTS petanque (
                    first_name text,
                    last_name text,
                    email text
        )"""
        )
        conn.commit()
    except FileNotFoundError as e:
        print(f'Error: {e}')
    finally:
        conn.close()


def show_allData():
    try:
        conn = sql.connect(DATABASE)
        cur = conn.cursor()

        cur.execute("SELECT rowid, * FROM members")
        data_list = cur.fetchall()
        for item in data_list:
            print(item)

        conn.commit()
    except FileExistsError as e:
        print(f"Error: {e}")
    finally:
        conn.close()


def delete_account(dbname, email):
    try:
        conn = sql.connect(DATABASE)
        curs = conn.cursor()  
        curs.execute("DELETE from petanque WHERE email = ?", (email,))
        conn.commit()
    except FileNotFoundError as e:
        print(f'Error: {e}')
    finally:
        conn.close()


def update_account(dbname, email):
    try:
        conn = sql.connect(DATABASE)
        curs = conn.cursor()  
        curs.execute(
            """
            UPDATE members SET 
            email = 'bob@will.com' WHERE
            rowid = 4
            """
        )
        conn.commit()
    except FileNotFoundError as e:
        print(f'Error: {e}')
    finally:
        conn.close()


def add_members(dbname, email):
    try:
        conn = sql.connect(DATABASE)
        curs = conn.cursor()  
        curs.executemany("INSERT INTO members VALUES (?,?,?)", members_list)

        conn.commit()
    except FileNotFoundError as e:
        print(f'Error: {e}')
    finally:
        conn.close()


def email_lookUp(email):
    conn = sql.connect(DATABASE)
    cur = conn.cursor()

    cur.execute("SELECT * from members WHERE email LIKE '"+email+"'")
    data_list = cur.fetchall()
    for item in data_list:
        print(item)

    conn.commit()
    conn.close()

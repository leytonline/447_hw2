import json
import sqlite3

DEFAULT_DATA = [
    ("Steve Smith",211,80),
    ("Jian Wong",122,92),
    ("Chris Peterson",213,91),
    ("Sai Patel",524,94),
    ("Andrew Whitehead",425,99),
    ("Lynn Roberts",626,90),
    ("Robert Sanders",287,75)
]  

class DB:
    def prime_db(self):
        db = sqlite3.connect("database.db")
        clear_table = """DROP TABLE IF EXISTS data"""
        db.execute(clear_table)
        
        make_table = """CREATE TABLE IF NOT EXISTS data(
            name varchar,
            id int,
            score int
        ) """
        
        db.execute(make_table)
        
        db.commit()
        db.close()
        for data in DEFAULT_DATA:
            self.add_user_to_db(data)
        return None
    
    def add_user_to_db(self, params):
        # params looks like (name, id, score)
        db = sqlite3.connect("database.db")
        add_user = """INSERT INTO data(name,id,score)
                values(?,?,?)
                """
        db.execute(add_user, params)
        db.commit()
        db.close()
        return None
    
    def delete_user_from_db(self, ID):
        db = sqlite3.connect("database.db")
        rm_user = "DELETE FROM data WHERE id=(?)"
        db.execute(rm_user, (ID,))
        db.commit()
        db.close()
        return None

    def dump_table(self):
        db = sqlite3.connect( "database.db" )
        db.row_factory = sqlite3.Row
        dbCur = db.cursor()
        rows = db.execute("SELECT * from data").fetchall()
        db.commit()
        db.close()
        return json.dumps([dict(ix) for ix in rows])
    
    def search_for(self, params):
        T1 = f"name=\"{params[0]}\"" if params[0] else "name=\"name\""
        T2 = f"id={params[1]}" if params[1] else "id=\"id\""
        T3 = f"score={params[2]}" if params[2] else "score=\"score\""
        
        print(T1, T2, T3)
        
        db = sqlite3.connect( "database.db" )
        dbCur = db.cursor()
        res = db.execute("SELECT * from data WHERE {} AND {} AND {}".format(T1, T2, T3)).fetchall()
        
        db.commit()
        db.close()
        
        print("returning: ", json.dumps([{"name":ix[0], "id":ix[1], "score":ix[2]} for ix in res]))
        return json.dumps([{"name":ix[0], "id":ix[1], "score":ix[2]} for ix in res])
    

if __name__ == "__main__":
    db = DB()
    db.prime_db()
    
    db.search_for(("","",""))
    
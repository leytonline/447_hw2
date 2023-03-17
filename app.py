from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 
import sqlite3
import json
from api.dbInterface import dbInterface
from api.db import DB
        
app = Flask(__name__)
CORS(app)
dbApi = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

dbMgr = DB()
dbMgr.prime_db()

dbApi.add_resource(dbInterface, '/hw2/api')
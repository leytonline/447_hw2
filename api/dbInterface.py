from flask import jsonify
from flask_restful import Resource, reqparse
from .db import DB

class dbInterface(Resource):
  def __init__(self):
    self.db = DB()
    
  def get(self):
    return jsonify(self.db.dump_table())

  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('pType', type=str)
    parser.add_argument('name', type=str)
    parser.add_argument('idCreate', type=str)
    parser.add_argument('score', type=str)
    parser.add_argument('nameSearch', type=str)
    parser.add_argument('idSearch', type=str)
    parser.add_argument('scoreSearch', type=str)
    
    args = parser.parse_args()
    
    print(args)
    
    if args['pType'] == 'C':
      self.db.add_user_to_db((args["name"], args["idCreate"], args["score"]))
    else:
      return self.db.search_for((args["nameSearch"], args["idSearch"], args["scoreSearch"]))
    
    return jsonify(self.db.dump_table())
  
  def delete(self):
    parser = reqparse.RequestParser()
    parser.add_argument('idDelete', type=str)
    args = parser.parse_args()
    
    self.db.delete_user_from_db(args["idDelete"])
    
    return jsonify(self.db.dump_table())
    
    
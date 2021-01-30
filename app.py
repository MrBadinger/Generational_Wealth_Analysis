from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import data_import
import pymongo
import json


# Create an instance of Flask
app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.us_state
state_metrics = db.state_metrics

# retrun the data from data_import.py
wealth_data = data_import.load_state_metrics()

# insert data into mongodb
state_metrics.insert_many(wealth_data)

@app.route("/")
def home():
    return (
            f"Welcome to the US State Data API!<br/>"
            f"Available Routes:<br/>"
            f"http://127.0.0.1:5000/api/v1.0/us-state-data"
        )


@app.route("/api/v1.0/us-state-data")
def get_api():
    documents = state_metrics.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)
   
if __name__ == "__main__":
    app.run(debug=True)
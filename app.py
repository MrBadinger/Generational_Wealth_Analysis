from flask import Flask, render_template, redirect, jsonify
import data_import
import pymongo
import json

################################################################################
## state economic metrics flask app
###############################################################################


# Create an instance of Flask
app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.us_state
state_metrics = db.state_metrics

# truncate exiting state metric collection
state_metrics.remove()

# return the data from data_import.py
wealth_data = data_import.load_state_metrics()

# insert data into mongodb
state_metrics.insert_many(wealth_data)

# root route
@app.route("/")
def home():
    return (
            f"<strong><h1>Welcome to the Generational Wealth Analysis API!</h1></strong>"
            f"<br/><h3>API Syntax Examples:</h3>"
            f"<p>Return all annual economic data for all states:</p>"
            f"<p><strong>http://127.0.0.1:5000/api/v1.0/us-state-data</strong></p>"
            f"Return all annual economic data for a specific state:<br/>"
            f"<p><strong>http://127.0.0.1:5000/api/v1.0/state/California</strong></p>"
            f"Return annual economic data for all states for a specific year"
            f"<p><strong>http://127.0.0.1:5000/api/v1.0/year/2013</strong></p>"
            f"Return annual economic data for a specific year and a specific state"
            f"<p><strong>http://127.0.0.1:5000/api/v1.0/state-year/New York/2015</strong></p>"
            f"Return annual economic data for all states by range of years"
            f"<p><strong>http://127.0.0.1:5000/api/v1.0/year-range/2014/2018</strong></p>"
            f"Return annual economic data for a specified state by range of years"
            f"<p><strong>http://127.0.0.1:5000/api/v1.0/state-year-range/Colorado/2011/2019</strong></p>"
        )

# all annual economic data for all states route
@app.route("/api/v1.0/us-state-data")
def get_us_state_data():
    documents = state_metrics.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# all annual economic data for a specific state route
@app.route("/api/v1.0/state/<state>")
def get_state(state):
    documents = state_metrics.find({"state": state})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# annual economic data for a specific year and all states route
@app.route("/api/v1.0/year/<year>")
def get_year(year):
    documents = state_metrics.find({"year": year})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# annual economic data for a specific year and a specific state route
@app.route("/api/v1.0/state-year/<state>/<year>")
def get_state_year(state,year):
    documents = state_metrics.find({"state": state, "year": year})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# annual economic data for all states by range of years route
@app.route("/api/v1.0/year-range/<start_year>/<end_year>")
def get_year_range(start_year,end_year):
    documents = state_metrics.find({"year":{"$gte": start_year, "$lte": end_year}})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# annual economic data for a specified state by range of years route
@app.route("/api/v1.0/state-year-range/<state>/<start_year>/<end_year>")
def get_state_year_range(state,start_year,end_year):
    documents = state_metrics.find({"state": state,"year":{"$gte": start_year, "$lte": end_year}})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
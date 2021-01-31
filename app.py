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
            f"<br/><h3>Available Routes:</h3><br/>"
            f'<a href="http://127.0.0.1:5000/api/v1.0/us-state-data">US State Economic Data</a>'
        )

# all us state data api route
@app.route("/api/v1.0/us-state-data")
def get_all_state_data():
    documents = state_metrics.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# all us state data by an individual state api route
@app.route("/api/v1.0/state/<state>")
def get_indiv_state_data(state):
    documents = state_metrics.find({"state": state})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# all us state data by specific year
@app.route("/api/v1.0/year/<year>")
def get_annual_data(year):
    documents = state_metrics.find({"year": year})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)

# all us state data by specific state and year
@app.route("/api/v1.0/state-year/<state>/<year>")
def get_state_by_year_data(state,year):
    documents = state_metrics.find({"state": state, "year": year})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    
    return jsonify(response)
   
if __name__ == "__main__":
    app.run(debug=True)
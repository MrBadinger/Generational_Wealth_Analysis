var data_url = "http://127.0.0.1:5000/api/v1.0/us-state-data";
var drop_state_url = "http://127.0.0.1:5000/api/v1.0/distinct_state"

/////////////////////////////////////////////////////////////////////////////////////////////////
// function to Initializes the page
/////////////////////////////////////////////////////////////////////////////////////////////////

function init() {

    // select the dropdown menu by selecting the id selDataset
    var dropdown = d3.select("#selDataset");

     // Use D3 fetch to read the JSON file
    d3.json(drop_state_url ).then((data)=> {
       // console.log(data)
        state = data

        for (i = 0; i < state.length; i++) {
            //console.log(state[i]);
            dropdown.append("option").text(state[i]).property("value");
          }

        plotCharts(state[1]);
    });   
}
  
init();

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for change event handling
/////////////////////////////////////////////////////////////////////////////////////////////////

function optionChanged(stateName) {

    plotCharts(stateName);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// line chart
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotCharts(stateName) {
    d3.json(data_url).then(function(importedData) {


    var filteredSample = importedData.filter(filtersample => filtersample.state === stateName);

    console.log(filteredSample)

    // // Trace1 for the homeownership Data
    var trace1 = {
        x: filteredSample.map(row => row.year),
        y: filteredSample.map(row => row.homeownership_rate),
        text: filteredSample.map(row => row.state),
        name: "Home Ownership Rate",
        type: "line",
    };

    var trace2 = {
        x: filteredSample.map(row => row.year),
        y: filteredSample.map(row => row.bachelor_degree_pcnt),
        //text: data.map(row => row.state),
        name: "Bachelor Degree %",
        type: "line",
    };

    var trace3 = {
        x: filteredSample.map(row => row.year),
        y: filteredSample.map(row => row.high_school_grad_pcnt),
        //text: data.map(row => row.homeownership_rate),
        name: "High School %",
        type: "line",
    };

    // data
    var chartData = [trace1,trace2,trace3];

    // Apply the group bar mode to the layout
    var layout = {
        title: "Homeownership over time",
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("lineplot", chartData, layout);
     });

}

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

        plotBarLine(state[0]);
        plotLine(state[0]);
    });   
}
  
init();

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for change event handling
/////////////////////////////////////////////////////////////////////////////////////////////////

function optionChanged(stateName) {

    plotBarLine(stateName);
    plotLine(stateName);
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// line chart
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotLine(stateName) {
    d3.json(data_url).then(function(importedData) {


    var filteredSample = importedData.filter(filtersample => filtersample.state === stateName);

    // // Trace1 for the homeownership Data
    var trace1 = {
        x: filteredSample.map(row => row.year),
        y: filteredSample.map(row => row.homeownership_rate),
        text: filteredSample.map(row => row.state),
        name: "Home Ownership Rate",
        type: "line",
    };

    // data
    var chartData = [trace1];

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

/////////////////////////////////////////////////////////////////////////////////////////////////
// bar line chart
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotBarLine(stateName) {
d3.json(data_url).then(function(importedData) {


    var data = importedData.filter(filtersample => filtersample.state === stateName);

    var years = [];
    var stateList = [];
    var hsGradPcnts = [];
    var collGradPcnts = [];
    var homeOwnerPcnts = [];
    var gdplist = [];
    for (var i = 0; i < data.length; i++) {
      var year = data[i].year
      years.push(year);
      var state = data[i].state
      stateList.push(state)
      var hsGrads = data[i].high_school_grad_pcnt
      hsGradPcnts.push(hsGrads);
      var collGrads = data[i].bachelor_degree_pcnt
      collGradPcnts.push(collGrads);
      var homeRate = data[i].homeownership_rate
      homeOwnerPcnts.push(homeRate);
      var gpd = data[i].ttl_gdp_by_state
      gdplist.push(gpd);

    };


    // GDP & Ownership Rates over time - Line Graph
    var trace1 = {
        x: years,
        y: gdplist,
        name: 'State GDP $',
        type: 'bar'
    };

    var trace2 = {
        x: years,
        y: homeOwnerPcnts,
        name: 'Home Ownership %',
        yaxis: 'y2',
        mode: 'lines+markers',
        type: 'scatter'

    };

    var layout = {
        title: 'State GDP vs. Home Ownership Percentage',
        yaxis: {title: 'State GDP ($ Millions)'},
        yaxis2: {
          title: 'Home Ownership (%)',
          overlaying: 'y',
          side: 'right',
          showgrid: false,
          showline: true
        }
      };

    var array_scat = [trace1, trace2]
    Plotly.newPlot("chart_one", array_scat, layout);
})
}
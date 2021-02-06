var url = "http://127.0.0.1:5000/api/v1.0/state/California";

d3.json(url).then(function(data) {
    console.log(data)
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







































});

    // // GDP & Ownership Rates over time - Line Graph
    // var trace1 = {
    //     x: years,
    //     y: gdplist,
    //     mode: 'lines+markers',
    //     type: 'scatter'

    // };

    // var trace2 = {
    //     x: years,
    //     y: homeOwnerPcnts,
    //     mode: 'lines+markers',
    //     type: 'scatter'

    // };

    // var layout_bar = {
    //     title: "Top Ten Operational Taxonomic Units",
    //     yaxis:{
    //         tickmode:"linear",
    //     },
    //     margin: {
    //         l: 100,
    //         r: 100,
    //         t: 100,
    //         b: 100,
    //     }
    // };

    // Plotly.newPlot("chart_one", trace1, trace2, layout_bar);

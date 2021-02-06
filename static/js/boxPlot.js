var data_url = "http://127.0.0.1:5000/api/v1.0/us-state-data";


/////////////////////////////////////////////////////////////////////////////////////////////////
// Median HH Income/Personal Income boxplot chart
/////////////////////////////////////////////////////////////////////////////////////////////////


d3.json(data_url).then(function(importedData) {


    var x = importedData.map(row => row.year);

    
    var trace1 = {
    y: importedData.map(row => row.median_hh_income),
    x: x,
    name: 'Median HH Income',
    marker: {color: '#f39800'},
    type: 'box'
    };

    var trace2 = {
        y: importedData.map(row => row.per_captia_personal_income),
        x: x,
        name: 'Per Capita Personal Income',
        marker: {color: '#95d8EB'},
        type: 'box'
        };

    

    var data = [trace1,trace2];

    var layout = {
    yaxis: {
        title: 'Dollars',
        zeroline: false
    },
    boxmode: 'group',
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5'
    };

    Plotly.newPlot('boxDollars',data, layout);

})

/////////////////////////////////////////////////////////////////////////////////////////////////
// Total GDP boxplot chart
/////////////////////////////////////////////////////////////////////////////////////////////////


d3.json(data_url).then(function(importedData) {


    var x = importedData.map(row => row.year);
    
    var trace1 = {
        y: importedData.map(row => row.ttl_gdp_by_state),
        x: x,
        name: 'Total GDP',
        marker: {color: '#f39800'},
        type: 'box'
    };
    

    var data = [trace1];

    var layout = {
    yaxis: {
        title: 'Total GDP (Millions)',
        zeroline: false
    },
    boxmode: 'group',
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5'
    };

    Plotly.newPlot('boxGDP',data, layout);

})


/////////////////////////////////////////////////////////////////////////////////////////////////
// Total GDP boxplot chart
/////////////////////////////////////////////////////////////////////////////////////////////////


d3.json(data_url).then(function(importedData) {


    var x = importedData.map(row => row.year);

    
    var trace1 = {
        y: importedData.map(row => row.homeownership_rate),
        x: x,
        name: 'Homeownership Rate',
        marker: {color: '#95d8EB'},
        type: 'box'
    };
    

    var data = [trace1];

    var layout = {
    yaxis: {
        title: 'Homeownership Rate',
        zeroline: false,
    },
    boxmode: 'group',
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5'
    };

    Plotly.newPlot('boxHome',data, layout);

})




var url = "http://127.0.0.1:5000/api/v1.0/year-range/2008/2018";

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}


// d3.json(url).then(function(data) {
//   var bach = data[0].year
//   console.log(year)
// })

d3.json(url).then(function(d) {
  
  var bs_degrees =[];
  var hs_degrees = [];
  var ownership_rts = [];
  var med_hh_incomes = [];
  var personal_incomes = [];
  var gdp_states = [];
  var state_list = [];
  
  for (var i = 0; i < d.length; i++) {
    var bs_degree = d[i].bachelor_degree_pcnt;
    bs_degrees.push(bs_degree);
    var hs_degree = d[i].high_school_grad_pcnt;
    hs_degrees.push(hs_degree);
    var ownership_rt = d[i].homeownership_rate;
    ownership_rts.push(ownership_rt);
    var med_hh_income = d[i].median_hh_income;
    med_hh_incomes.push(med_hh_income);
    var personal_income = d[i].per_captia_personal_income;
    personal_incomes.push(personal_income);
    var gdp_state = d[i].ttl_gdp_by_state;
    gdp_states.push(gdp_state);
    var state = d[i].state;
    state_list.push(state);
    // console.log(state)
  };
  console.log(med_hh_incomes)

  var axis =() => ({
    showline: false,
    zeroline: false,
    gridcolor:'#ffff',
    ticklen:6
  });

  var data = [{
    type: 'splom',
    dimensions: [
      {label: 'BS Degree', values: bs_degrees},
      {label: 'HS Degree', values: hs_degrees},
      {label: 'Ownership Rate', values: ownership_rts},
      {label: 'Household Income', values: med_hh_incomes},
      {label: 'Personal Income', values: personal_incomes},
      {label: 'State GDP', values: gdp_states}
    ],
    text: state_list,
    marker: {
      color: "blue",
      size: 7,
      line: {
        color: 'white',
        width: 0.5
      }
    }
  }];
  

  var layout = {
    title: 'Scatterplot Matrix for Homeownership Study',
    height: 1000,
    width: 1000,
    autosize: false,
    hovermode: 'closest',
    dragmode: 'select',
    plot_bgcolor: 'rgba(240,240,240, 0.95)',
    xaxis:axis(),
    yaxis:axis(),
    xaxis2:axis(),
    xaxis3:axis(),
    xaxis4:axis(),
    xaxis5:axis(),
    xaxis6:axis(),
    yaxis2:axis(),
    yaxis3:axis(),
    yaxis4:axis(),
    yaxis5:axis(),
    yaxis6:axis()
  }

  Plotly.react('garyplot', data, layout)
})


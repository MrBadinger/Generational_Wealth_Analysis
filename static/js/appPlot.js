var url = "http://127.0.0.1:5000/api/v1.0/state/California";

d3.json(url).then(function(data) {

    for (var i = 0; i < data.length; i++) {
    var year = data[i].year
    console.log(year)
    }

})


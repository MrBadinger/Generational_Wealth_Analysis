
var url = "http://127.0.0.1:5000/api/v1.0/state/California";

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}
d3.json(url).then(function(data) {
    var hsGrads = unpack(data.high_school_grad_pcnt, 0);
    var collGrads = unpack(data.bachelor_degree_pcnt, 0);
    console.log(hsGrads);
    console.log(collGrads);
});
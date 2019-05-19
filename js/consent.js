var svg6;

var dataset = d3.csv("csv/sex_asslt_def.csv", translateCellsCsv3, function(data){
    console.log(data);
    
    svg6.data(data)
        .enter()
        .append("div")
        .attr("class", "bar");
                     
                     });

svg6 = d3.select("#consentChart")
    .append("svg")
    .attr("width", w2)
    .attr("height", h);
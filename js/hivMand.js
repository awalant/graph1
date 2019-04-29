//var showHiv = function(){
    dataset = d3.csv("csv/states2.csv", translateCells, function (data) {

    console.log(data);

    //Loads in the json of the states as provided by Scott Murray, taken from Mike Bostock.
    //Load in GeoJSON data
    var usMap = d3.json("json/us-states.json", function (json) {

        //this tells the function to go through each part of the array
        for (var i = 0; i < data.length; i++) {
            //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
            var dataName = data[i].name;
            //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color
            var dataNumber = parseFloat(data[i].hiv_ed_mandated);

            //This goes through the features of the json object 
            for (var j = 0; j < json.features.length; j++) {
                //this stores the name of the states as jsonName
                var jsonName = json.features[j].properties.name;

                //if the name of the state in the csv matches with the name of the state in the json, then set the value of the json's value property to the same as dataNumber (which comes from the column sex_ed_mandated) then move on from that
                if (dataName == jsonName) {
                    json.features[j].properties.value = dataNumber;
                    break;
                }
            }
        }

        //select all of the svgs that are paths from the geoJSON file, then apply the data from json.features and make those paths fill according to the value. Since the CSV value is somewhere between 0 and 1, then if the value of the property of the json is greater than or equal to 0, send the value through the color function. Otherwise, make it light grey. For all, apply a stroke of .5 
        svg3.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                var value = d.properties.value;

                if (value >= 0) {
                    return color(value);
                } else {
                    return "#C5DBD7";
                }
            })
//            .style("opacity", 0)
            .style("stroke", "white")
            .style("stroke-width", .75)
            .on("mouseover", function (d) {
                console.log(d.properties.name + d.properties.value);
            })
            .append("title")
            .text(function (d) {
                return d.properties.name;
            });

    });


});

//Define path generator
var path = d3.geoPath(projection);

//Create SVG element
var svg3 = d3.select("#map3")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//};

//showHiv();



//
//        //define legend
//        var legend = svg.append("g")
//            .attr("transform", "translate(" + (width - 10), +"," + (height / 4) + ")");
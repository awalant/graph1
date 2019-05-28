//var showHiv = function(){
dataset = d3.csv("csv/states_pt1.csv", translateCellsCsv1, function (data) {

    console.log(data);

    //Loads in the json of the states as provided by Scott Murray, taken from Mike Bostock.
    //Load in GeoJSON data
    var usMap = d3.json("json/us-states.json", function (json) {

        //this tells the function to go through each part of the array
        for (var i = 0; i < data.length; i++) {
            //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
            var dataName = data[i].name;
            //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color
            var dataNumber = parseFloat(data[i].parents_opt);

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
                    return colorRev(value);
                } else {
                    return nothing;
                }
            })
            //            .style("opacity", 0)
            .style("stroke", "lightgrey")
            .style("stroke-width", .75)
            .on("mousemove", function (d) {
                var value;
                if (d.properties.value === 1) {
                    value = " allows parents to pull their children out of sex ed related classes"; //whatever goes in if true
                } else if (d.properties.value === 0) {
                    value = " does not allow parents to pull their children from sex ed related classes";
                } else if (d.properties.value == .5) {
                    value = " allows parents to pull their children out of HIV ed related classes";
                } else {
                    value = " does not have corrosponding data";
                }
                //           
                var label = d.properties.name + value;
                var tooltip = document.getElementById("tooltip-1");
                var top = d3.event.clientY + "px";
                var left = d3.event.clientX + "px";
                tooltip.innerHTML = label;
                tooltip.style.top = top;
                tooltip.style.left = left;
                //                        console.log("I AM IN TOOLTIPS");
            })
            .on("mouseover", function (d) {
                d3.select("#tooltip-1")
                    .classed("hidden", false);


            })
            .on("mouseout", function (d) {
                d3.select("#tooltip-1")
                    .classed("hidden", true);
            });

    });


});

//Define path generator
var path = d3.geoPath(projection);

//Create SVG element
var svg3 = d3.select("#map3")
    .append("svg")
    .attr("width", w2)
    .attr("height", h);

var legend3Scale = d3.scaleOrdinal()
    .domain(["No data", "Parents can remove children", "Parents can remove from HIV courses", "Parents cannot remove children"])
    .range([nothing, colorNeg, colorMid, colorPos]);

svg3.append("g")
    .attr("class", "legendOrdinal")
//    .attr("transform", "translate(" + (w2 + legendWidth) + "," + (h - legendHeight*2) + ")" );
.attr("transform", "translate(" + (w2-(legendWidth*4))+ "," + (h-legendHeight*4) +")");

var legend3 = d3.legendColor()
    .shapeWidth(shapeWidth)
    .cells(4)
    .labelWrap(30)
    .shapePadding(shapePadding)
    .orient("vertical")
    .scale(legend3Scale);

svg3.select(".legendOrdinal")
    .call(legend3);

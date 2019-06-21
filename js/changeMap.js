var svg4 = d3.select("#map4");

dataset = d3.csv("csv/states_pt1.csv", translateCellsCsv1, function (data) {

    console.log(data);

    //Loads in the json of the states as provided by Scott Murray, taken from Mike Bostock.
    //Load in GeoJSON data
 d3.json("json/us-states.json", function (json) {
            projection.fitSize([currentWidthMap, currentHeightMap], mapData);

        //this tells the function to go through each part of the array
        for (var i = 0; i < data.length; i++) {
            //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
            var dataName = data[i].name;
            //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color


            var dataNumber = parseFloat(data[i].anti_religion);

            //This goes through the features of the json object 
            for (var j = 0; j < mapData.features.length; j++) {
                //this stores the name of the states as jsonName
                var jsonName = mapData.features[j].properties.name;

                //if the name of the state in the csv matches with the name of the state in the json, then set the value of the json's value property to the same as dataNumber (which comes from the column sex_ed_mandated) then move on from that
                if (dataName == jsonName) {
                    mapData.features[j].properties.value = dataNumber;
                    break;
                }
            }
        }


        //select all of the svgs that are paths from the geoJSON file, then apply the data from json.features and make those paths fill according to the value. Since the CSV value is somewhere between 0 and 1, then if the value of the property of the json is greater than or equal to 0, send the value through the color function. Otherwise, make it light grey. For all, apply a stroke of .5 
        svg4.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                var value = d.properties.value;
                if (value >= 0) {
                    return color(value);
                } else {
                    return nothing;
                }
            })
            .style("stroke", "lightgrey")
            .style("stroke-width", .75)
            .on("mousemove", function (d) {
                var value;
                if (d.properties.value === 1) {
                    value = " has rules in place to block religious influence on sex education lessons"; //whatever goes in if true
                } else if (d.properties.value === 0) {
                    value = " does not have rules in place to block religious influence on sex education lessons";
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




//var keysMap4 = ["No mandated HIV education", "Has mandated HIV education"];
//
//var colorMap4 = d3
//    .scaleOrdinal()
//    .domain(keysMap4)
//    .range([nothing, colorPos]);
//
//
//
////legend4
//var legend4 = d3.select("#legend4");
//
//var keys4 = legend4.selectAll("li-key").data(colorMap4);
//
//legend4.append("ul").attr("class", "list-inline");
//
//keys4
//    .data(colorMap4.range())
//    .enter()
//    .append("li")
//    .attr("class", "key")
//    .style("border-top-color", String)
//    //      function(d) {
//    // return d;
//    // })
//    .data(colorMap4.domain())
//    .text(function (d) {
//        return d;
//    })
//    .data(colorMap4.range())
//    .style("color", function (d) {
//        return d
//    });


//Define path generator
var path = d3.geoPath(projection);

//Create SVG element

//    .append("text")
//    .attr("x", (w / 2))
//    .attr("y", 0 - (h / 10))
//    .attr("text-anchor", "middle")
//    .text("LOOK A TITLE")
//    .enter();

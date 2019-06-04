d3.select("#antiRel")
    .on("click", function () {

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


                    var dataNumber = parseFloat(data[i].anti_religion);

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
                var states = svg4.selectAll("path")
                    .data(json.features)
                    .attr("d", path)
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
                //            .append("title")
                //            .text(function (d) {
                //                return d.properties.name;
                //            });
                //            .on("mouseout", tip.hide);


                states.transition()
                    .duration(800)
                    .style("fill", function (d) {
                        var value = d.properties.value;

                        if (value >= 0) {
                            return color(value);
                        } else {
                            return nothing;
                        }
                    });
            });
            //            https://stackoverflow.com/questions/28874957/how-to-update-overwrite-map-and-legend-content-using-d3
            d3.select("#legend4").selectAll("p").remove();
            d3.select("#legend4").selectAll("li").remove();

            legend4.append("p")
                .attr("class", "legendTitle")
                .text("Religious rules regarding sex education");

            var keysMap4b = ["No rules about religion in sex ed", "Does not allow religious bias in sex ed"];

            var colorMap4b = d3
                .scaleOrdinal()
                .domain(keysMap4b)
                .range([nothing, colorPos]);

            var keys4b = legend4.selectAll("li-key").data(colorMap4b);

            //            legend4.append("ul").attr("class", "list-inline");
            //
            //
            keys4b
                .data(colorMap4b.range())
                .enter()
                .append("li")
                .attr("class", "key")
                .style("border-top-color", String)
                .data(colorMap4b.domain())
                .text(function (d) {
                    return d;
                })
                .data(colorMap4b.range())
                .style("color", function (d) {
                    return d
                });

        });
    });

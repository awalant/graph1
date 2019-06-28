//Use d3 to select the id #contraception
d3.select("#contraception")

    //Use event listeners to track when #contraception is clicked on
    .on("click", function () {


        //The dataset is from a csv file of the states, created by hand to combine census data, stats from the Guttmacher institute https://www.guttmacher.org/state-policy/explore/sex-and-hiv-education , and population data
        //An argument of the d3 method csv is translateCellsCsv1, which is established in definitions.js -- it takes the data from the csv and translates it to numbers and strings based on my preference according to how I want the data to be utilized. 
        //"data" becomes the term used in the anonymous function to pass around the information, but technically any term could have been placed here and the functionality would have remained the same.
        dataset = d3.csv("csv/states_pt2.csv", translateCellsCsv2, function (data) {

            //Loads in the GeoJSON data of the states as provided by Scott Murray, taken from Mike Bostock.
            d3.json("json/us-states.json", function (json) {

                //Special thank you to the d3 slack group for showing me "fitSize()" as I didn't know that existed. It takes the projection and fits it within the parameters specified, and passes in the object mapData which is specified in the file us-states.json
                projection.fitSize([currentWidthMap, currentHeightMap], mapData);

                //this tells the function to go through each part of the array
                for (var i = 0; i < data.length; i++) {
                    //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
                    var dataName = data[i].name;
                    //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color


                    var dataNumber = parseFloat(data[i].contraception);

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


                //Select all of the svgs that are paths from the geoJSON file. For all, apply a stroke of .75.
                var states = svg4.selectAll("path")
                    .data(mapData.features)
                    .attr("d", path)
                    .style("stroke", "lightgrey")
                    .style("stroke-width", .75)

                    //Tool tip functionality starts here. When the mouse moves, create the variable label. If the mouse moves, the label is specified in each conditional branch based on the mouse positioning over paths, but otherwise the label is just the name of the path. Select the id #tooltip-1 and specify that the top and left coordinates of it should be where the mouse position is. Set the text of the tooltip to the label as determined via the conditional statements, and set it to the top and left values. Then, remove the class .hidden when the mouse is over it and reapply the class when the mouse is moved off of it.
                    .on("mousemove", function (d) {
                        var label;

                        if (d.properties.name === "Mississippi") {
                            label = d.properties.name + " must get permission from the State Department of Education to cover contraception and STIs";
                        } else {
                            label = d.properties.name;
                        }
                        var tooltip = document.getElementById("tooltip-1");
                        var top = d3.event.clientY + "px";
                        var left = d3.event.clientX + "px";
                        tooltip.innerHTML = label;
                        tooltip.style.top = top;
                        tooltip.style.left = left;
                    })
                    .on("mouseover", function (d) {
                        d3.select("#tooltip-1")
                            .classed("hidden", false);


                    })
                    .on("mouseout", function (d) {
                        d3.select("#tooltip-1")
                            .classed("hidden", true);
                    });


                //A transition method is applied to the paths so that as the maps change from one to another, it happens seamlessly. It will occur over 800 ms. Then apply the data from json.features and make those paths fill according to the value. Since the CSV value is somewhere between 0 and 1, then if the value of the property of the json is greater than or equal to 0, send the value through the color function. Otherwise, set it to nothing. For specific states, set it to .6 opacity, for everything else leave it at 1.
                states.transition()
                    .duration(800)
                    .attr("fill-opacity", function (d) {
                        if (d.properties.name === "Mississippi") {
                            return ".3";
                        } else {
                            return "1";
                        }
                    })
                    .style("fill", function (d) {
                        var value = d.properties.value;

                        if (value >= 0) {
                            return color(value);
                        } else {

                            return nothing;
                        }
                    });
            });

            
            //Code borrowed from (below) to select the legend and remove the list and div (keys) from the previous map
            //            https://stackoverflow.com/questions/28874957/how-to-update-overwrite-map-and-legend-content-using-d3
            d3.select("#legend4").selectAll("div").remove();
            d3.select("#legend4").selectAll("li").remove();


            //Legend code borrowed somewhat from https://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
            //Set the keys for the map to determine the different factors mentioned in the legend
            var keysMap4a = ["No mandatory coverage of contraceptive options", "Mandatory coverage of contraceptive options"];

            //The colormap uses the d3 method scaleOrdinal() with the domain of the keys above and specifies a range of which colors should be applied to the keys.
            var colorMap4a = d3
                .scaleOrdinal()
                .domain(keysMap4a)
                .range([nothing, colorPos]);

            //The keys selects the list items and applies the data to it.
            var keys4a = legend4.selectAll("li-key").data(colorMap4a);

            //Use the colorMap range to determine the keys and set the background colors, then apply the domain to the list items and bind the data to it. If the background color is white, make the text a darker color, otherwise leave the text white.
            keys4a
                .data(colorMap4a.range())
                .enter()
                .append("div")
                .attr("class", "key")
                .style("background-color", String)
                .data(colorMap4a.domain())
                .append("li")
                .attr("class", "key")
                .text(function (d) {
                    return d;
                })
                .data(colorMap4a.range())
                .style("color", function (d) {
                    if (d === nothing) {
                        return "#2f4858";
                    } else {
                        return "white";
                    }
                });

        });


    });

//The variable svg2 is for selecting the specific canvas by the id #map2
var svg2 = d3.select("#map2");


//The dataset is from a csv file of the states, created by hand to combine census data, stats from the Guttmacher institute https://www.guttmacher.org/state-policy/explore/sex-and-hiv-education , and population data
//An argument of the d3 method csv is translateCellsCsv1, which is established in definitions.js -- it takes the data from the csv and translates it to numbers and strings based on my preference according to how I want the data to be utilized. 
//"data" becomes the term used in the anonymous function to pass around the information, but technically any term could have been placed here and the functionality would have remained the same.
dataset = d3.csv("csv/states_pt1.csv", translateCellsCsv1, function (data) {

    //Loads in the GeoJSON data of the states as provided by Scott Murray, taken from Mike Bostock.
    d3.json("json/us-states.json", function (json) {

        //Special thank you to the d3 slack group for showing me "fitSize()" as I didn't know that existed. It takes the projection and fits it within the parameters specified, and passes in the object mapData which is specified in the file us-states.json
        projection.fitSize([currentWidthMap, currentHeightMap], mapData);

        //this tells the function to go through each part of the array
        for (var i = 0; i < data.length; i++) {

            //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
            var dataName = data[i].name;

            //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color
            var dataNumber = parseFloat(data[i].med_acc);

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

        //Select all of the svgs that are paths from the geoJSON file, then apply the data from json.features and make those paths fill according to the value. Since the CSV value is somewhere between 0 and 1, then if the value of the property of the json is greater than or equal to 0, send the value through the color function. Otherwise, set it to nothing. The opacity of specified states will be .6, everything else will be 1. For all, apply a stroke of .75.
        svg2.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill-opacity", function (d) {
                if (d.properties.name === "Michigan" || d.properties.name === "Illinois") {
                    return ".6";
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
            })
            .style("stroke", "lightgrey")
            .style("stroke-width", .75)

            //Tool tip functionality starts here. When the mouse moves, create the variable label. If the mouse moves, the label is specified in each conditional branch based on the mouse positioning over paths, but otherwise the label is just the name of the path. Select the id #tooltip-1 and specify that the top and left coordinates of it should be where the mouse position is. Set the text of the tooltip to the label as determined via the conditional statements, and set it to the top and left values. Then, remove the class .hidden when the mouse is over it and reapply the class when the mouse is moved off of it.
            .on("mousemove", function (d) {
                var label;

                if (d.properties.name === "Michigan") {
                    label = d.properties.name + " specifically states that sex ed 'shall not be medically inaccurate'";

                } else if (d.properties.name === "Illinois") {
                    label = d.properties.name + " does not have mandatory sex ed, but health class is mandated and covers abstinence with medical accuracy";

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

    });


});
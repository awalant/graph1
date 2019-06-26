var svg1;

dataset = d3.csv("csv/states_pt1.csv", translateCellsCsv1, function (data) {

    //    console.log(data);


    //Loads in the json of the states as provided by Scott Murray, taken from Mike Bostock.
    //Load in GeoJSON data
    d3.json("/json/us-states.json", function (json) {
        projection.fitSize([currentWidthMap, currentHeightMap], mapData);


        //        usMap = geojson.feature(json, json.objects);
        //        console.log(usMap);

        //this tells the function to go through each part of the array
        for (var i = 0; i < data.length; i++) {
            //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
            var dataName = data[i].name;
            //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color


            var dataNumber = parseFloat(data[i].sex_ed_mandated);

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
        svg1.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill-opacity", function (d) {
                if (d.properties.name === "Illinois" || d.properties.name === "Tennessee" || d.properties.name === "Mississippi" || d.properties.name === "Utah") {
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
                };
            })
            .style("stroke", "lightgrey"

            )
            .style("stroke-width", .75)
            .on("mousemove", function (d) {
                var label;

                if (d.properties.name === "Illinois") {
                    label = d.properties.name + " does not have mandatory sex ed, but health class is mandated and covers abstinence with medical accuracy";

                } else if (d.properties.name === "Tennessee") {
                    label = d.properties.name + " has mandated sex education only in areas where the teen pregnancy rate is greater than or equal to 19.5%";
                } else if (d.properties.name === "Mississippi") {
                    label = d.properties.name + " only allows contraception and STIs to be covered if the district receives permission from the State Department of Education";
                } else if (d.properties.name === "Utah") {
                    label = d.properties.name + " does not allow teachers to answer questions from students that may conflict with the law";
                }else {
                    label = d.properties.name;
                };
                var tooltip = document.getElementById("tooltip-1");
                var top = d3.event.clientY + "px";
                var left = d3.event.clientX + "px";
                tooltip.innerHTML = label;
                tooltip.style.top = top;
                tooltip.style.left = left;
                //                console.log("I AM IN TOOLTIPS");
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


//});

//Define path generator
//var path = d3.geoPath(projection);

//Create SVG element
svg1 = d3.select("#map1");

// projection.fitSize([widthGraph, heightGraph], usMap);
//    .append("text")
//    .attr("x", (w / 2))
//    .attr("y", 0 - (h / 10))
//    .attr("text-anchor", "middle")
//    .text("LOOK A TITLE")
//    .enter();


//var legend1Scale = d3.scaleOrdinal()
//    .domain(["no mandatory sex education", "mandatory sex education"])
//    .range([nothing, colorPos]);
//
//svg1.append("g")
//    .attr("class", "legendOrdinal")
////    .attr("transform", "translate(" + (w2 + legendWidth) + "," + (h - legendHeight*2) + ")" );
//.attr("transform", "translate(" + (w2-(legendWidth*4))+ "," + (h-legendHeight*4) +")");
//
//var legend1 = d3.legendColor()
//    .shapeWidth(shapeWidth)
//    .cells(2)
//    .labelWrap(30)
//    .shapePadding(shapePadding)
//    .orient("vertical")
//    .scale(legend1Scale);
//
//svg1.select(".legendOrdinal")
//    .call(legend1);

//var legend1 = svg1.append("ul")
//    .attr("class", "list-inline");
//
//var things1 = legend1.selectAll("li.key")
//    .data(legend1Scale);
//
//things1.enter()
//    .append("li")
//    .attr("class", "key")






//
//        //define legend
//        var legend = svg.append("g")
//            .attr("transform", "translate(" + (width - 10), +"," + (height / 4) + ")");

  //Width and height
  var w = 800;
  var h = 600;

  //Define map projection
  var projection = d3.geoAlbersUsa()
      .translate([w / 2, h / 2])
      .scale([1000]);




  //      Make a function for translating the data and store it as the variable translateCells to be called when binding the csv.
  var translateCells = function (d) {
      return {
          id: parseFloat(d.id),
          name: d.name,
          age_appr: parseFloat(d.age_appr)


      };

  };

  var colorScale = ["#FFC1D1", "#FF92AF", "#FF1654"];


  //        Uses a quantize scale to take the value of the data and make it one of the two colors listed. By making this function its own variable, I can call it later within the function where I bind the data.

  var color = d3.scaleQuantize()
      .range(colorScale);

  var dataset = d3.csv("csv/states2.csv", translateCells, function (data) {

      console.log(data);

      //Loads in the json of the states as provided by Scott Murray, taken from Mike Bostock.
      //Load in GeoJSON data
      var usMap = d3.json("json/us-states.json", function (json) {

          //this tells the function to go through each part of the array
          for (var i = 0; i < data.length; i++) {
              //this assigns each cell from the column 'name' to dataName so that it can be cross-checked with the name of the states in the json
              var dataName = data[i].name;
              //this parses the data from the column sex_ed_mandated into a number, then stores it in the variable dataNumber to later be assigned a value to determine the color
              var dataNumber = parseFloat(data[i].age_appr);

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
          svg.selectAll("path")
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
              .style("stroke", "white")
              .style("stroke-width", .75)
              .on("mouseover", function (d) {
                  console.log(d.properties.name);
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
  var svg = d3.select("#map2")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  //
  //        //define legend
  //        var legend = svg.append("g")
  //            .attr("transform", "translate(" + (width - 10), +"," + (height / 4) + ")");

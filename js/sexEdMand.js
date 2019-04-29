//code for responsive window sizing from https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window?noredirect=1&lq=1

var width = window.innerWidth
|| document.documentElement.clientWidth 
|| document.body.clientWidth;


var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


//width, heigh, translate and scale all derived from playing with this block http://bl.ocks.org/radiocontrolled/7698088

//Width and height
  var w = width*.97;
  var h = width/1.85;

  //Define map projection
  var projection = d3.geoAlbersUsa()
      .translate([w / 3, h / 2])
      .scale([w/1.2]);

  //      Make a function for translating the data and store it as the variable translateCells to be called when binding the csv.
  var translateCells = function (d) {
      return {
          id: parseFloat(d.id),
          name: d.name,
          sex_ed_mandated: parseFloat(d.sex_ed_mandated),
          age_appr: parseFloat(d.age_appr),
          hiv_ed_mandated: parseFloat(d.hiv_ed_mandated)


      };

  };

  //colors from https://blog.graphiq.com/finding-the-right-color-palettes-for-data-visualizations-fcd4e707a283 optimized to be okay for color blindness as well as for promoting readability of the map
  var colorScale = ["#501A73", "#A73B8F", "#EE8695"];


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


              var dataNumber = parseFloat(data[i].sex_ed_mandated);

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
          svg1.selectAll("path")
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
                var result = d.properties.value;
              
              if (result == 1){
                  console.log(d.properties.name + " has mandatory sex ed! :)");
              } else if (result == 0) {
                  console.log(d.properties.name + " does not have mandatory sex ed :(");
              }
              
//                  console.log(d.properties.name + result);
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
  var svg1 = d3.select("#map1")
      .append("svg")
      .attr("width", w)
      .attr("height", h);


    

  //
  //        //define legend
  //        var legend = svg.append("g")
  //            .attr("transform", "translate(" + (width - 10), +"," + (height / 4) + ")");

//var data = Object.assign(d3.csv("csv/sex_asslt_def.csv", d3.autoType), {y:"Total Percentage"});
//
//console.log(data);
//var dataset = d3.csv("csv/sex_asslt_def.csv", translateCellsCsv3, function (data) {
//    console.log(data);
//
//    svg6.data(data)
//        .enter()
//        .append("div")
//        .attr("class", "bar")
//        .style("height", function (d) {
//            return d.yes_m + "px";
//        });
//
//});



//var dataset1= [
////    { yes: 96, no:1, unclear:3, na:.002 },
////    { yes: 21, no:19, unclear:59, na:.002 },
////    { yes: 47, no:6, unclear:46, na:.002 }   
//    
////    { incapacitated: 95, influenced: 18, notClear: 42 },
////    { incapacitated: 1, influenced: 25, notClear: 7 },
////    { incapacitated: 4, influenced: 56, notClear: 50 },
////    { incapacitated: .45, influenced: 1, notClear: 1 },
////    { incapacitated: 97, influenced: 24, notClear: 52 },
////    { incapacitated: .45, influenced: 14, notClear: 6 },
////    { incapacitated: 2, influenced: 63, notClear: 42 },
////    { incapacitated: 0, influenced: 0, notClear: 0 }
//    
//    { incapacitated: 96, influenced: 21, notClear: 47 },
//    { incapacitated: 1, influenced: 19, notClear: 6 },
//    { incapacitated: 3, influenced: 59, notClear: 46 },
//    { incapacitated: .45, influenced: .45, notClear: .45 }
//    
//    
//]
//
//
//var dataset2 = [96, 21, 47];
//
//var svg6 = d3.select("#consentChart")
//    .append("svg")
//    .attr("width", w2)
//    .attr("height", h);
//
//var stack = d3.stack()
//    .keys(["incapacitated", "influenced", "notClear"]);
//
////var colors = d3.scale.schemeCategory10();
//
//var series = stack(dataset1);
//
////var xScale = d3.scaleLinear()
////    .domain(d3.range(dataset1[0].length))
////    .nice([0, w2], 0.05);
////
////var yScale = d3.scaleLinear()
////    .domain([0,
////            d3.max(dataset1, function(d){
////                return d3.max(d, function(d){
////                    return d.incapacitated + d.influenced + d.notClear;
////                });
////            })
////            ])
////.range([0, h]);
////
////
////var groups = svg6.selectAll("g")
////    .data(series)
////    .enter()
////    .append("g")
////    .style("fill", function (d, i) {
////        return colors(i);
////    });
////
////var rects = groups.selectAll("rect")
////    .data(function(d) {return d;})
////    .enter()
////    .append("rect")
////    .attr("x", function (d,i){
////        return xScale(i);
////    })
////    .attr("y", function (d){
////        return yScale(d[0]);
////    })
////    .attr("height", function(d){
////        return yScale(d[1]) - yScale(d[0]);
////    })
////    .attr("width", xScale.bandwidth());
//
//console.log(series);



//following code heavily adapted from https://codepen.io/iamraviteja/pen/bOragL

//this data comes from a national survey done by The Washington Post and the Kaiser Foundation
//The data is in the form of an array of objects, where the values are grouped by the subject.
var data = [
    {
        topic: "incapacitated",
        yes: 96,
        no: 1,
        unclear: 3,
        noOpinion: .5
  },
    {
        topic: "influenced",
        yes: 21,
        no: 19,
        unclear: 59,
        noOpinion: .5
  },
    {
        topic: "notClear",
        yes: 47,
        no: 6,
        unclear: 46,
        noOpinion: .5
  }
];

//I believe that this filters through the data (using k) and takes anything that isn't a topic and stores it in an array. This collects the different types of results that can be displayed.
var keys = Object.keys(data[0]).filter(k => k !== "topic");

console.log(keys);

//This establishes a margin for the barchart.
var margin = {
    top: 30,
    right: 10,
    bottom: 80,
    left: 80
};


var widthGraph = w2 - margin.left - margin.right;
var heightGraph = h - margin.top - margin.bottom;
var barwidth = 40;


//select the div with the id consentChart and append an svg to it, then give it the attributes of the width plus the margins and the height plus the margins, then append a group and move the whole thing over by the margins.
var graph = d3
    .select("#consentChart")
    .append("svg")
    .attr("width", widthGraph + margin.left + margin.right)
    .attr("height", heightGraph + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//SCALES

//Variable x is the d3 function scaleBand, which considers the padding between the bars to help determine the desired width of the bar chart. Its domain is the topics from the dataset, and the range is the width as specified above.
var x = d3
    .scaleBand()
    .domain(
        data.map(function (d) {
            return d.topic;
        })
    )
    .range([0, widthGraph]);

//Variable y is the d3 function scaleLinear, which takes the input of the range (the height of the graph and 0), and outputs the domain (between 0 and 100)

var y = d3
    .scaleLinear()
    .range([heightGraph, 0])
    .domain([0, 100]);

//Variable z is the d3 function scaleOrdinal, which can take arrays of strings and output the values accordingly. In this case, it's taking these four colors.
var z = d3.scaleOrdinal().range(["orange", "coral", "orangered", "red"]);

//AXES

//Variable xAxis is the d3 function axisBottom with the argument x
var xAxis = d3.axisBottom(x);

//Now, append a group to the variable graph and give it the class x-axis, and move it to 0 + heightGraph, then call xAxis
graph
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + heightGraph + ")")
    .call(xAxis);


//Variable yAxis is the d3 function axisLeft with the argument y
var yAxis = d3.axisLeft(y);


//give z the domain created from the variable keys
z.domain(keys);


//Variable stack is the result of some d3 method chaining, using stack() to stack the information, keys to gather the different categories, and says not to keep it in any particular order and with no offsetting.
var stack = d3
    .stack()
    .keys(keys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);


//Variable layers takes stack and inserts the argument data, creating an array where the values are determined by the values of the topic underneath it.
var layers = stack(data);

console.log(layers);


//the domain of y is set to 0 and 1.15 times the length of the layers array, for each instance of d (data)
y.domain([0, 1.15 * d3.max(layers[layers.length - 1], d => d[1])]);


//append another group to the graph and give it the class of y-axis, and call yAxis
graph
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);

//layer takes the graph, selects all of the class layer (even though it doesn't exist yet) and inserts the data from layers onto it. It then appends a group, gives it the class of layer, and fills it using the ordinal scale for z for each of the different answers.

var layer = graph
    .selectAll(".layer")
    .data(layers)
    .enter()
    .append("g")
    .attr("class", "layer")
    .style("fill", function (d) {
        return z(d.key);
    });

console.log('layer', layer);


//then take layer, select all rectangles, and for each instance of the data append a rectangle with the class bar-placeholder (styled in css) to the graph. give it the x value of each instance of data, and give the bands a width of x.bandwidth()/2, -20 px. give each of them the height of the graph, and the width of 40px.
layer
    .selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter()
    .append("rect")
    .attr("class", "bar-placeholder")
    .attr("x", function (d) {
        return x(d.data.topic) + x.bandwidth() / 2 - 20;
    })
    .attr("height", function (d) {
        return heightGraph;
    })
    .attr("width", 40);

//Then take layer, and select all of the bar-placeholder class. For each instance of the data, append a rectangle with the class bar, and give it the same attributes as the placeholder bars, but set the y value to the index of 1 for each piece of data, and the height to the index of 0 minus the index of 1, with a width of 40px.

layer
    .selectAll("bar-placeholder")
    .data(function (d) {
        console.log('d', d);
        return d;
    })
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
        return x(d.data.topic) + x.bandwidth() / 2 - 20;
    })
    .attr("y", function (d) {
        return y(d[1]);
    })
    .attr("height", function (d) {
        return y(d[0]) - y(d[1]);
    })
    .attr("width", 40);


//Then, select all the text and for each piece of the data, append text to it with the class bar-label. Give it the x value of d.data.topic plus the bandwidth/2, and y value of the index of 1 of each piece of data - 5px. Set the text to say the value of the ???
layer
    .selectAll("text")
    .data(function (d) {
        return d;
    })
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", function (d) {
        return x(d.data.topic) + x.bandwidth() / 2 + 20;
    })
    .attr("y", function (d) {
        return y(d[1]) + ((y(d[0]) - y(d[1]))/2);
    })
    .text(function (d) {
        return d[1]-d[0]; 
//            + d.data.no + d.data.unclear + d.data.noOpinion;
    });

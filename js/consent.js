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
        noOpinion: .45
  },
    {
        topic: "influenced",
        yes: 21,
        no: 19,
        unclear: 59,
        noOpinion: .45
  },
    {
        topic: "notClear",
        yes: 47,
        no: 6,
        unclear: 46,
        noOpinion: .45
  }
];

//I believe that this filters through the data and takes the first entry, being the topic, and labels it as the topic?
var keys = Object.keys(data[0]).filter(k => k !== "topic");

//This establishes a margin for the barchart.
var margin = {
    top: 30,
    right: 10,
    bottom: 80,
    left: 80
};


var width = w2 - margin.left - margin.right;
var height = h - margin.top - margin.bottom;
var barwidth = 40;

var graph = d3
    .select("#consentChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//SCALES
var x = d3
    .scaleBand()
    .domain(
        data.map(function (d) {
            return d.topic;
        })
    )
    .range([0, width]);

var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

var z = d3.scaleOrdinal().range(["orange", "coral", "orangered", "red"]);

//AXES
var xAxis = d3.axisBottom(x);
graph
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

var yAxis = d3.axisLeft(y);

z.domain(keys);

var stack = d3
    .stack()
    .keys(keys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

var layers = stack(data);
console.log(layers);

y.domain([0, 1.15 * d3.max(layers[layers.length - 1], d => d[1])]);

graph
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);

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
        return height;
    })
    .attr("width", 40);

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

layer
    .selectAll("text")
    .data(function (d) {
        return d;
    })
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", function (d) {
        return x(d.data.topic) + x.bandwidth() / 2;
    })
    .attr("y", function (d) {
        return y(d[1]) - 5;
    })
    .text(function (d) {
        return d.data.yes + d.data.no + d.data.unclear + d.data.noOpinion;
    });

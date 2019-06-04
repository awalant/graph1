//following code heavily adapted from https://codepen.io/iamraviteja/pen/bOragL

//this data comes from a national survey done by The Washington Post and the Kaiser Foundation
//The data is in the form of an array of objects, where the values are grouped by the subject.
var data = [
    {
        topic: "naked",
        yes: 47,
        no: 49,
        unclear: 3,
        noOpinion: 1
  },
    {
        topic: "condom",
        yes: 40,
        no: 54,
        unclear: 4,
        noOpinion: 1
  },
    {
        topic: "nods",
        yes: 54,
        no: 40,
        unclear: 3,
        noOpinion: 3
  },
    {
        topic: "foreplay",
        yes: 22,
        no: 74,
        unclear: 3,
        noOpinion: .5
  },
       {
        topic: "silent",
        yes: 18,
        no: 77,
        unclear: 3,
        noOpinion: 1
  }
];

//I believe that this filters through the data (using k) and takes anything that isn't a topic and stores it in an array. This collects the different types of results that can be displayed.
var keys = Object.keys(data[0]).filter(k => k !== "topic");

console.log(keys);


//select the div with the id consentChart and append an svg to it, then give it the attributes of the width plus the margins and the height plus the margins, then append a group and move the whole thing over by the margins.
var graph = d3
    .select("#consentChart");
//    .append("svg")
//    .attr("width", w)
//    .attr("height", heightGraph - margin.bottom)
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
var z = d3.scaleOrdinal().range([colorNeg, colorPos, colorMid, "lightgrey"]);

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
var yAxis = d3.axisLeft(y)
    .ticks(3);


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
y.domain([0, d3.max(layers[layers.length - 1], d => d[1])]);


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
    }).on("mousemove", function (d) {
        console.log(d);
        var label = d.key;
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
        return h;
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
        return x(d.data.topic) + x.bandwidth() / 2 + 25;
    })
    .attr("y", function (d) {
        return y(d[1]) + ((y(d[0]) - y(d[1]))/2);
    })
    .text(function (d) {
        if ((d[1]-d[0])>3){
            return d[1]-d[0]
            }
       else {
           return
       }; 
//            + d.data.no + d.data.unclear + d.data.noOpinion;
    });


//graph.append("g")
//    .attr("class", "legendOrdinal")
//    .attr("transform", "translate(" + (widthGraph + legendWidth) + "," + (heightGraph - legendHeight*2) + ")" );
//
//var legendOrdinal = d3.legendColor()
//    .shapeWidth(shapeWidth)
//    .cells(4)
//    .shapePadding(shapePadding)
//    .orient("vertical")
//    .scale(z);
//
//graph.select(".legendOrdinal")
//    .call(legendOrdinal);

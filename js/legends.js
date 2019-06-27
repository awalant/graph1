var legend1 = d3.select("#legend1");
var legend2 = d3.select("#legend3");
var legend3 = d3.select("#legend2");
//var legend4 = d3.select("#legend4");
var legend5 = d3.select("#legend5");
var legend6 = d3.select("#legend6");
var legend7 = d3.select("#legend7");

//legend1 variables
var keysMap1 = ["No mandated sex ed", "Has mandated sex ed"];

var colorMap1 = d3
    .scaleOrdinal()
    .domain(keysMap1)
    .range([nothing, colorPos]);

//legend2 variables
var keysMap2 = ["Not medically accurate by law", "Medically accurate by law"];

var colorMap2 = d3
    .scaleOrdinal()
    .domain(keysMap2)
    .range([nothing, colorPos]);

//legend3 variables
var keysMap3 = ["Child can be excused from sex ed", "Child can be excused from HIV ed", "Child cannot be excused from class"];

var colorMap3 = d3
    .scaleOrdinal()
    .domain(keysMap3)
    .range([nothing, colorMid, colorPos]);

//legend4 variables located in changeMap.js, and the js files in /selected



//function drawLegend() {
//    var currentWidth = parseInt(d3.select("#legend1").style("width"), 10);
//
//
//    d3.selectAll(".legend")
//        .attr("width", currentWidth);
//    //  legend1.attr("width", currentWidth);
//
//}
//
//drawLegend();
//
//window.addEventListener("resize", drawLegend);

//legend1

//legend1.append("ul").attr("class", "list-inline");

//legend1.append("p")
//    .attr("class", "legendTitle")
//    .text("Key");

var keys1 = legend1.selectAll("li-key").data(colorMap1);

keys1
    .data(colorMap1.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap1.domain())
    .append("li")
    .attr("class", "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap1.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });


//legend2

//legend2.append("ul").attr("class", "list-inline");

//legend2.append("p")
//    .attr("class", "legendTitle")
//    .text("Key");

var keys2 = legend2.selectAll("li-key").data(colorMap2);

keys2
    .data(colorMap2.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap2.domain())
    .append("li")
    .attr("class", "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap2.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });


//legend3

//legend3.append("ul").attr("class", "list-inline");

//legend3.append("p")
//    .attr("class", "legendTitle")
//    .text("Key");

var keys3 = legend3.selectAll("li-key").data(colorMap3);

keys3
    .data(colorMap3.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap3.domain())
    .append("li")
    .attr("class", "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap3.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });


//legend4

var keysMap4 = ["No rules about religion in sex ed", "Does not allow religious bias in sex ed"];


var colorMap4 = d3
    .scaleOrdinal()
    .domain(keysMap4)
    .range([nothing, colorPos]);



//legend4
var legend4 = d3.select("#legend4");

var keys4 = legend4.selectAll("li-key").data(colorMap4);

//legend4.append("ul").attr("class", "list-inline");

//legend4.append("p")
//    .attr("class", "legendTitle")
//    .text("Key");

keys4
    .data(colorMap4.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap4.domain())
    .append("li")
    .attr("class",  "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap4.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });




//sexual assault chart, legend 6

var keysMap6= ["yes", "no", "unclear", "no opinion"];


var colorMap6 = d3
    .scaleOrdinal()
    .domain(keysMap6)
    .range([colorNeg, colorPos, colorMid, nothing]);



//legend6
var legend6 = d3.select("#legend6");

var keys6 = legend6.selectAll("li-key").data(colorMap6);

//legend4.append("ul").attr("class", "list-inline");

//legend6.append("p")
//    .attr("class", "legendTitle")
//    .text("Key");

keys6
    .data(colorMap6.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap6.domain())
    .append("li")
    .attr("class", "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap6.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });

//consent chart, legend 7





//legend7
var legend7 = d3.select("#legend7");

var keys7 = legend7.selectAll("li-key").data(colorMap6);


//legend4.append("ul").attr("class", "list-inline");

//legend7.append("p")
//    .attr("class", "legendTitle")
//    .text("Key");

keys7
    .data(colorMap6.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap6.domain())
    .append("li")
    .attr("class", "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap6.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });




//var ordinal = z
//    .domain([function(d){
//        return d.keys;
//    }]);
//
//graph.append("g")
//    .attr("class", "legendOrdinal")
//    .attr("transform", "translate(" + (w + legendWidth) + "," + (h - legendHeight*2) + ")" );
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












//when user selects antirel
//d3.select("#antiRel")
//    .on("click", function () {
//        d3.select('#legend4').selectAll("li").remove();
//
//        keysMap4 = [
//        "No rules about religion in sex ed", "Does not allow religious bias in sex ed"
//    ];
//
//
//        keys4
//            .data(colorMap4.range())
//            .enter()
//            .append("li")
//            .attr("class", "key")
//            .style("border-top-color", String)
//            //      function(d) {
//            // return d;
//            // })
//            .data(colorMap4.domain())
//            .text(function (d) {
//                return d;
//            })
//            .data(colorMap4.range())
//            .style("color", function (d) {
//                return d
//            });
//
//    });

//when user selects contraception
//d3.select("#contraception")
//    .on("click", function () {
//$("#contraception").click(function(){
//    console.log("user clicked contraception");
//        d3.select('#legend4').selectAll("li").remove();
////
//        keysMap4 = [
//        "No mandatory coverage of contraceptive options", "Mandatory coverage of contraceptive options"
//    ];
////
////
//        keys4
//            .data(colorMap4.range())
//            .enter()
//            .append("li")
//            .attr("class", "key")
//            .style("border-top-color", String)
//            .data(colorMap4.domain())
//            .text(function (d) {
//                return d;
//            })
//            .data(colorMap4.range())
//            .style("color", function (d) {
//                return d
//            });
//
//    });
var legend1 = d3.select("#legend1");
var legend2 = d3.select("#legend2");
var legend3 = d3.select("#legend3");
//var legend4 = d3.select("#legend4");
var legend5 = d3.select("#legend5");
var legend6 = d3.select("#legend6");

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



function drawLegend() {
    var currentWidth = parseInt(d3.select("#legend1").style("width"), 10);


    d3.selectAll(".legend")
        .attr("width", currentWidth);
    //  legend1.attr("width", currentWidth);

}

drawLegend();

window.addEventListener("resize", drawLegend);

//legend1

//legend1.append("ul").attr("class", "list-inline");

legend1.append("p")
    .attr("class", "legendTitle")
    .text("Sex education");

var keys1 = legend1.selectAll("li-key").data(colorMap1);

keys1
    .data(colorMap1.range())
    .enter()
    .append("li")
    .attr("class", "key")
    .style("border-top-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap1.domain())
    .text(function (d) {
        return d;
    })
    .data(colorMap1.range())
    .style("color", function (d) {
        return d
    });


//legend2

//legend2.append("ul").attr("class", "list-inline");

legend2.append("p")
    .attr("class", "legendTitle")
    .text("Medically accurate information");

var keys2 = legend2.selectAll("li-key").data(colorMap2);

keys2
    .data(colorMap2.range())
    .enter()
    .append("li")
    .attr("class", "key")
    .style("border-top-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap2.domain())
    .text(function (d) {
        return d;
    })
    .data(colorMap2.range())
    .style("color", function (d) {
        return d
    });


//legend3

//legend3.append("ul").attr("class", "list-inline");

legend3.append("p")
    .attr("class", "legendTitle")
    .text("Removal of children from sex-ed related classes");

var keys3 = legend3.selectAll("li-key").data(colorMap3);

keys3
    .data(colorMap3.range())
    .enter()
    .append("li")
    .attr("class", "key")
    .style("border-top-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap3.domain())
    .text(function (d) {
        return d;
    })
    .data(colorMap3.range())
    .style("color", function (d) {
        return d
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

legend4.append("p")
    .attr("class", "legendTitle")
    .text("Religious rules regarding sex education");

keys4
    .data(colorMap4.range())
    .enter()
    .append("li")
    .attr("class", "key")
    .style("border-top-color", String)
    //      function(d) {
    // return d;
    // })
    .data(colorMap4.domain())
    .text(function (d) {
        return d;
    })
    .data(colorMap4.range())
    .style("color", function (d) {
        return d
    });

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
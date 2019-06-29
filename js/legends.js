//Selecting the legend ids and naming them as variables
var legend1 = d3.select("#legend1");
var legend2 = d3.select("#legend3");
var legend3 = d3.select("#legend2");
//Legend 4 located in changemap.js
var legend5 = d3.select("#legend5");
var legend6 = d3.select("#legend6");
var legend7 = d3.select("#legend7");

//Legend variables (the same general format is utilized for all of the legends, so I will explain it once here, and assume the rest are the same just with different definitions of the variables unless otherwise stated)
//the key maps label the different options for the legend items
var keysMap1 = ["No mandated sex ed", "Has mandated sex ed"];

//The color map takes an ordinal scale and submits the keys map as the domain, and the range as the desired colors. 
var colorMap1 = d3
    .scaleOrdinal()
    .domain(keysMap1)
    .range([nothing, colorPos]);

//This variable sets up d3 to apply the data from colorMap1 to the soon-to-exist class .li-key
var keys1 = legend1.selectAll("li-key").data(colorMap1);

//Take keys1 and use the range data from colorMap1 to enter and append divs, and attribute the class .key to them, and style them with the background color of the specified strings.
//Then, use the domain data from colorMap1 and append lists to them under the class .key, and the text from the data. 
//Finally, use the range data from colorMap1 and use that to apply the color to the list items. If their background color is white, apply a blue to the text, otherwise the text should be white.
keys1
    .data(colorMap1.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
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

//legend2 variables
var keysMap2 = ["Not medically accurate by law", "Medically accurate by law"];

var colorMap2 = d3
    .scaleOrdinal()
    .domain(keysMap2)
    .range([nothing, colorPos]);

//legend2

var keys2 = legend2.selectAll("li-key").data(colorMap2);

keys2
    .data(colorMap2.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
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

//legend3 variables
var keysMap3 = ["Child can be excused from sex ed", "Child can be excused from HIV ed", "Child cannot be excused from class"];

var colorMap3 = d3
    .scaleOrdinal()
    .domain(keysMap3)
    .range([nothing, colorMid, colorPos]);

//legend3

var keys3 = legend3.selectAll("li-key").data(colorMap3);

keys3
    .data(colorMap3.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
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



//legend4 variables located in changeMap.js, and the js files in /selected

//legend4

var keysMap4 = ["No rules about religion in sex ed", "Does not allow religious bias in sex ed"];


var colorMap4 = d3
    .scaleOrdinal()
    .domain(keysMap4)
    .range([nothing, colorPos]);



//legend4
var legend4 = d3.select("#legend4");

var keys4 = legend4.selectAll("li-key").data(colorMap4);

keys4
    .data(colorMap4.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
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
//chart 6 variables
var keysMap6= ["yes, it is sexual assault", "no, it's not sexual assault", "unclear", "no opinion"];


var colorMap6 = d3
    .scaleOrdinal()
    .domain(keysMap6)
    .range([colorNeg, colorPos, colorMid, nothing]);

//legend6
var legend6 = d3.select("#legend6");

var keys6 = legend6.selectAll("li-key").data(colorMap6);

keys6
    .data(colorMap6.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
 
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
//chart 7 variables

var keysMap7= ["yes, indicates consent", "no, doesn't indicate consent", "unclear", "no opinion"];

var colorMap7 = d3
    .scaleOrdinal()
    .domain(keysMap7)
    .range([colorNeg, colorPos, colorMid, nothing]);

var legend7 = d3.select("#legend7");

var keys7 = legend7.selectAll("li-key").data(colorMap6);


keys7
    .data(colorMap7.range())
    .enter()
    .append("div")
    .attr("class", "key")
    .style("background-color", String)
    .data(colorMap7.domain())
    .append("li")
    .attr("class", "key")
    .text(function (d) {
        return d;
    })
    .data(colorMap7.range())
    .style("color", function (d) {
        if (d===nothing){
        return "#2f4858";
        } else{
            return "white";
        }
    });
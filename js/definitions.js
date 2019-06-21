//      Make a function for translating the data and store it as the variable translateCells to be called when binding the csv.
var translateCellsCsv1 = function (d) {
    return {
        id: parseFloat(d.id),
        name: d.name,
        sex_ed_mandated: parseFloat(d.sex_ed_mandated),
        age_appr: parseFloat(d.age_appr),
        hiv_ed_mandated: parseFloat(d.hiv_ed_mandated),
        med_acc: parseFloat(d.med_acc),
        cult_appr: parseFloat(d.cult_appr),
        anti_religion: parseFloat(d.anti_religion),
        parents: parseFloat(d.parents),
        parents_opt: parseFloat(d.parents_opt),
    };

};

var translateCellsCsv2 = function (d) {
    return {
        id: parseFloat(d.id),
        name: d.name,
        contraception: parseFloat(d.contraception),
        refusal: parseFloat(d.refusal),
        orientation: parseFloat(d.orientation)
    }
}

var translateCellsCsv3 = function (d) {
    return {
        topic: d.topic,
        yes_m: parseFloat(d.yes_m),
        no_m: parseFloat(d.no_m),
        unclear_m: parseFloat(d.unclear_m),
        na_m: parseFloat(d.na_m),
        yes_f: parseFloat(d.yes_f),
        no_f: parseFloat(d.no_f),
        unclear_f: parseFloat(d.unclear_f),
        na_f: parseFloat(d.na_f)
    }
}

//var mapData;

var colorPos = "#5e3c99";
var colorMid = "grey";
var colorNeg = "#e66101";
var nothing = "#FFF";

//code for responsive window sizing from https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window?noredirect=1&lq=1

var width = 
//document.getElementById("map1").clientWidth;
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;


var currentWidthMap;
//= parseInt(d3.select("#map1").style("width"), 10);



var height = 
//width/3.236;
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

var currentHeightMap;
//= parseInt(d3.select("#map1").style("height"), 10);

var shapeWidth = width * .1;
var shapePadding = shapeWidth / 4;
var legendHeight = shapePadding*6;
var legendWidth = shapePadding;
//Width and height
//var w = currentWidthMap;
//var w= currentWidth;
//console.log(w)
//+ (legendWidth*4);
//var w = 75vw;
//var h = 50vh;
//var h = currentHeightMap;
//var w = width;
//var h = w;
//var w2 = w;



//This establishes margins for the barchart.
var margin = {
    top: 30, //30
    right: 10, //10
    bottom: 80, //80
    left: 100 //100
};

var widthGraph; 
//= currentWidthMap - margin.left - margin.right;
var heightGraph; 
//= currentHeightMap - margin.bottom - margin.top;
//var barwidth = shapeWidth;


//Define map projection
var projection= d3.geoAlbersUsa();
var path = d3.geoPath().projection(projection);
//    .scale([currentWidthMap])
//    .translate([w / 3, h / 2]);
//.translate([w2/2 - (legendWidth*2), h/2]);
// .translate([w/3.5, h/1.5 - margin.bottom]);
//.translate([widthGraph/2, heightGraph/2]);

var colorScale = [nothing, colorMid, colorPos];

var reverseColorScale = [colorPos, colorMid, colorNeg];

var reverseColorScale2 = [colorPos, colorMid, nothing];

//        Uses a quantize scale to take the value of the data and make it one of the two colors listed. By making this function its own variable, I can call it later within the function where I bind the data.

var color = d3.scaleQuantize()
    .range(colorScale);

var colorRev = d3.scaleQuantize()
    .range(reverseColorScale);

var colorRev2 = d3.scaleQuantize()
    .range(reverseColorScale2);



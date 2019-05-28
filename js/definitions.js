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


var height = 
//width/3.236;
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

var shapeWidth = 40;
var shapePadding = 15;
var legendHeight = shapePadding*6;
var legendWidth = shapeWidth;
//Width and height
var w = (width * .75) + (legendWidth*4);
var h = height/1.75;
//var w = width;
//var h = w;
var w2 = w*.8;


//This establishes margins for the barchart.
var margin = {
    top: 30,
    right: 10,
    bottom: 80,
    left: 80
};

var widthGraph = w2 - margin.left - margin.right - (legendWidth*4);
var heightGraph = h - margin.top - margin.bottom;
var barwidth = 40;


//Define map projection
var projection = d3.geoAlbersUsa()
    .scale([w / 1.35])
//    .translate([w / 3, h / 2]);
.translate([w2/2 - (legendWidth*2), h/2]);

var colorScale = [nothing, colorMid, colorPos];

var reverseColorScale = [colorPos, colorMid, colorNeg];

//        Uses a quantize scale to take the value of the data and make it one of the two colors listed. By making this function its own variable, I can call it later within the function where I bind the data.

var color = d3.scaleQuantize()
    .range(colorScale);

var colorRev = d3.scaleQuantize()
    .range(reverseColorScale);



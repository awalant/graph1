/* 
 * Sources: 
 * 
 * The basis of the code for the entire project was built off of examples by Scott Murray from his tutorial book, Interactive Data Visualization for the Web. A link to his github is here: https://github.com/alignedleft/d3-book
 * 
 * Code for the quotes was custom built with assistance from Greg Nemes, http://www.workshop.co
 * 
 * Additionally, The code for the barcharts is based off of a codepen by Ravi Teja, https://codepen.io/iamraviteja/pen/bOragL 
 * 
 * Tidbits of code are suggestions from my thesis advisor, Aarthy Kannan Adityan, and various participants of the d3 slack group https://d3js.slack.com/
 * 
 * Other sources of code, and specific instances of the above are cited as best as I could, but I may not have attributed each line as it deserves, so I want to be sure that they are credited here!
 * 
 */


//Make a function for translating the data and store it as the variable translateCells to be called when binding the csv. parseFloat returns the values as numbers rather than strings. 
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

//Establishing color variables
var colorPos = "#5e3c99";
var colorMid = "grey";
var colorNeg = "#e66101";
var nothing = "#FFF";

//code for responsive window sizing from https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window?noredirect=1&lq=1

//Establish variables for and height, taking into consideration different ways of getting that information
var width = 

    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

var height = 

    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;



//This establishes margins for the barchart.
var margin = {
    top: 30,
    right: 75,
    bottom: 80,
    left: 100
};

//Establishing variables to be defined later in the main.js file
var widthGraph; 
var heightGraph; 
var currentWidthMap;
var currentHeightMap;


//Define map projection -- geoAlbersUsa is the map that puts Alaska and Hawaii near the other 48 states, even though in reality they're not geographically nearby.
var projection= d3.geoAlbersUsa();

//Path takes the geoJson file and renders it based on the projection specified in the variable "projection"
var path = d3.geoPath().projection(projection);

//This is the color scale is utilized for the various maps, depending on how I want the colors to be shown.
var colorScale = [nothing, colorMid, colorPos];

var reverseColorScale2 = [colorPos, colorMid, nothing];


// Uses a quantize scale to take the value of the data and make it one of the colors listed. By making this function its own variable, I can call it later within the function where I bind the data.
var color = d3.scaleQuantize()
    .range(colorScale);

var colorRev2 = d3.scaleQuantize()
    .range(reverseColorScale2);



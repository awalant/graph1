"use strict"

var colorPos = "#EE8695";
var colorMid = "#A73B8F";
var colorNeg = "#501A73";
var nothing = "#C5DBD7";

//code for responsive window sizing from https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window?noredirect=1&lq=1

var width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;


var height = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

//width, heigh, translate and scale all derived from playing with this block http://bl.ocks.org/radiocontrolled/7698088

//Width and height
var w = width * .97;
var h = height * 1.2;
var w2 = width * .75;

function resize() {
    console.log("RESIZED");
    //code to calculate new width and height
    width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;


    height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    w = width * .97;
    h = w/1.85; //height*1.2
    w2 = width * .75;

//    console.log(w, h);

    //projection scale translate
        projection = d3.geoAlbersUsa()
        .scale([w / 1.2])
        .translate([w / 3, h / 2]);
    
    
    
    d3.selectAll("path")
              .enter()
              .append("path")
              .attr("d", path);
    
    path = d3.geoPath(projection);

    //width and height to be applied: select svgs, give them width and heights.
    d3.selectAll("svg").attr("width", w2).attr("height", h);
    d3.selectAll("path").attr("d", path);
    
//    https://pudding.cool/process/responsive-scrollytelling/ 
    d3.selectAll(".step")
        .style("height", height +"px");

}

d3.select(window).on("resize", resize);

//Define map projection
var projection = d3.geoAlbersUsa()
    .scale([w / 1.2])
    .translate([w / 3, h / 2]);

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

//colors from https://blog.graphiq.com/finding-the-right-color-palettes-for-data-visualizations-fcd4e707a283 optimized to be okay for color blindness as well as for promoting readability of the map
var colorScale = [colorNeg, colorMid, colorPos];

var reverseColorScale = [colorPos, colorMid, colorNeg];


//        Uses a quantize scale to take the value of the data and make it one of the two colors listed. By making this function its own variable, I can call it later within the function where I bind the data.

var color = d3.scaleQuantize()
    .range(colorScale);

var colorRev = d3.scaleQuantize()
    .range(reverseColorScale);





//This is how to set up the library Scrollama.
var scroller = scrollama();



//handleStepEnter is a function that takes the argument "response" which is the object tracked by scrollama, which says the element that's being passed, its number in the array, and what direction the user is scrolling.
function handleStepEnter(response) {


    //variable for tracking the name of the element being passed
    var scrollStep = d3.select(response.element);

    //variable for tracking the number of the element being passed. the 'data-step' is set by me in the HTML so the program can keep better track of what's going on, as per best practices outlined on Scrollama's github
    var scrollVal = scrollStep.attr('data-step');
    
    d3.select(".caption").classed("hidden", function(d, i){
        
        i !== scrollVal;
    });

    console.log(response);
    
    
//    function changeCaption() {
//        if (scrollVal == 1) {
//            d3.select(".caption")
//                .text("LOOK AT THIS STUFF");
//
//
//
//
//        } else if (scrollVal == 2) {
//            d3.select("#caption")
//                .text("ISN'T IT NEAT");
//
//
//
//
//
//        } else if (scrollVal == 3) {
//            d3.select("#caption")
//                .text("WOULDN'T YOU SAY MY COLLECTION'S COMPLETE");
//        }
//    }
//    changeCaption();

}

function handleStepExit(response){

    var scrollStep = d3.select(response.element);
    var scrollVal = scrollStep.attr('data-step');
    
        d3.select(".caption")
            .attr("class", function(d, i){
        
        i == scrollVal;
    });
}


scroller
    .setup({
        step: ".step",
        debug: true,
        offset: 0.3
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

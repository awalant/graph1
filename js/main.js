"use strict"


//width, heigh, translate and scale all derived from playing with this block http://bl.ocks.org/radiocontrolled/7698088

function resize() {
    console.log("RESIZED");
    //code to calculate new width and height
    width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
//    width = document.getElementById("map1").clientWidth;
//    height = width/3.236;


    height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

 w = width * .75;
 h = height/1.75; //height*1.2
    w2 = width * .8;
//    w = width;
//    h = w;
//    w2 = w/2;

    //    console.log(w, h);

    //projection scale translate
    projection = d3.geoAlbersUsa()
        .scale([w / 1.2])
        .translate([w2 / 2, h / 2]);



    d3.selectAll("path")
        .enter()
        .append("path")
        .attr("d", path);

    path = d3.geoPath(projection);

    //width and height to be applied: select svgs, give them width and heights.
    d3.selectAll("svg").attr("width", w2).attr("height", h);
    d3.selectAll("path").attr("d", path);

    //    https://pudding.cool/process/responsive-scrollytelling/ 
//    d3.selectAll(".step")
//        .style("height", h + "px");

}

d3.select(window).on("resize", resize);
//window.onresize = resize();



//This is how to set up the library Scrollama.
var scroller = scrollama();

//d3.selectAll("path").style("stroke", "lightgrey");

//handleStepEnter is a function that takes the argument "response" which is the object tracked by scrollama, which says the element that's being passed, its number in the array, and what direction the user is scrolling.
function handleStepEnter(response) {


    //variable for tracking the name of the element being passed
    var scrollStep = d3.select(response.element);

    //variable for tracking the number of the element being passed. the 'data-step' is set by me in the HTML so the program can keep better track of what's going on, as per best practices outlined on Scrollama's github
    var scrollVal = scrollStep.attr('data-step');

    //from Aarthy
    d3.selectAll(".caption").classed("invisible", function (data, index) {
        return index !== (Number(scrollVal));
    });


    console.log(response);

}




scroller
    .setup({
        step: ".step",
//        debug: true,
        offset: 0.35
    })
    .onStepEnter(handleStepEnter);


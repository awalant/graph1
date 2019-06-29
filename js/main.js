"use strict"

//variables that use javascript to select DOM elements for altering below.
var title = document.getElementById("title");
var menu = document.getElementById("menu");

//https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp
//https://www.w3schools.com/howto/howto_js_remove_class.asp
//When the window is scrolled, call this function
window.onscroll = function () {
    
//    If the top of the document body/element is greater than 25px, then select #title and add the class .gone. 
//    select .header and change the background color to dark crimson, change the text color to a light nude, make the height of the header 1em, apply a box shadow and a transition.
//    select #menu and remove the class .gone, and add the display property of a flex box to the id.
//    Otherwise, if the top of the document is less than 25px, add the class .done to #menu and remove its flexbox display
//    select #title and remove the class .gone
//    select #header and remove the box shadow from it, and apply a transition.
    
    if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {

        $("#title")
            .addClass("gone");

        $("header")
            .css("background-color", "#482728")
            .css("color", "#fbe4de")
            .css("height", "1em")
            .css("box-shadow", "0px -2px 34px -1px rgba(72,39,40,0.69)")
            .css("transition", "1s");

        $("#menu")
            .removeClass("gone")
            .css("display", "flex");

    } else {

        $("#menu")
            .addClass("gone")
            .removeAttr("style", "display");

        $("#title")
            .removeClass("gone");

        $("header")
            .removeAttr("style", "box-shadow")
            .css("transition", "1s");

    }

};



//width, heigh, translate and scale all derived from playing with this block http://bl.ocks.org/radiocontrolled/7698088
//This function is for creating a responsive map
function drawChart() {
    
//    parseInt takes a string and an integer and returns an integer. In this case, the string being passed in is the width of #map1, and the integer is 10
    currentWidthMap = parseInt(d3.select("#map1").style("width"), 10);

//    parseInt takes a string and an integer and returns an integer. In this case, the string being passed in is the height of #map1, and the integer is 10
    currentHeightMap = parseInt(d3.select("#map1").style("height"), 10);

//    These calculations are made to fit the charts on the page better
    widthGraph = currentWidthMap - margin.left - margin.right;
    heightGraph = currentHeightMap - margin.bottom - margin.top;

//    fitSize was a method sent to me by the d3 slack group -- it takes the projection and fits it within the parameters of a given width and height, and applies a data object to it.
    projection.fitSize([currentWidthMap, currentHeightMap], mapData);
    d3.selectAll("path")
        .attr("d", path);
}

drawChart();

//When the window is resized, run the function drawChart
window.addEventListener("resize", drawChart);


//This is how to set up the library Scrollama via the scrollama API https://github.com/russellgoldenberg/scrollama
var scroller = scrollama();


//handleStepEnter is a function that takes the argument "response" which is the object tracked by scrollama, which says the element that's being passed, its number in the array, and what direction the user is scrolling.
function handleStepEnter(response) {


    //variable for tracking the name of the element being passed
    var scrollStep = d3.select(response.element);

    //variable for tracking the number of the element being passed. the 'data-step' is set by me in the HTML so the program can keep better track of what's going on, as per best practices outlined on Scrollama's github
    var scrollVal = scrollStep.attr("data-step");

    //from Aarthy -- this takes all of the elements with the class .caption and removes the class hidden from them when their data step is entered.
    d3.selectAll(".caption").classed("hidden", function (data, index) {
        return index !== (Number(scrollVal));
    });

}

//Thsi is how to initialize scrollama -- it sets up the plug in, tells it to look for the class .step as the steps, and offsets the trigger by .5vh, then when the step is entered (active) it runs handleStepEnter()
scroller
    .setup({
        step: ".step",
//                        debug: true,
        offset: 0.5
    })
    .onStepEnter(handleStepEnter);

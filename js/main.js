"use strict"

var title = document.getElementById("title");

var menu = document.getElementById("menu");

//https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp
//https://www.w3schools.com/howto/howto_js_remove_class.asp
window.onscroll = function () {
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

function drawChart() {
    currentWidthMap = parseInt(d3.select("#map1").style("width"), 10);


    currentHeightMap = parseInt(d3.select("#map1").style("height"), 10);

    widthGraph = currentWidthMap - margin.left - margin.right;
    heightGraph = currentHeightMap - margin.bottom - margin.top;

    projection.fitSize([currentWidthMap, currentHeightMap], mapData);

    d3.selectAll("path")
        .attr("d", path);
}

drawChart();

window.addEventListener("resize", drawChart);



//This is how to set up the library Scrollama.
var scroller = scrollama();


//handleStepEnter is a function that takes the argument "response" which is the object tracked by scrollama, which says the element that's being passed, its number in the array, and what direction the user is scrolling.
function handleStepEnter(response) {


    //variable for tracking the name of the element being passed
    var scrollStep = d3.select(response.element);

    //variable for tracking the number of the element being passed. the 'data-step' is set by me in the HTML so the program can keep better track of what's going on, as per best practices outlined on Scrollama's github
    var scrollVal = scrollStep.attr("data-step");

    //from Aarthy
    d3.selectAll(".caption").classed("hidden", function (data, index) {
        return index !== (Number(scrollVal));
    });

}




scroller
    .setup({
        step: ".step",
                        debug: true,
        offset: 0.5
    })
    .onStepEnter(handleStepEnter);

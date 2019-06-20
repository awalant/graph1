"use strict"

var title = document.getElementById("title");

var menu = document.getElementById("menu");

//var header
//document.getElementById("title");

//https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp
//https://www.w3schools.com/howto/howto_js_remove_class.asp
window.onscroll = function () {
    if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
        
        $("#title")
            .addClass("gone");
//            .css("font-size", ".8em")
//            .css("position", "relative")
//            .css("color", "#fbe4de")
//            .css("top", "0");
//            .css("background-color","#482728")
//            .css("transition", "1s");

            $("header")
             .css("background-color", "#482728")
            .css("color", "#fbe4de")
            .css("height", "1em")
            .css("box-shadow", "0px -2px 34px -1px rgba(72,39,40,0.69)")
            .css("transition", "1s");
//            .css("font-size", "1em");

        
        
        $("#menu")
            .removeClass("gone")
            .css("display", "flex");
        
        
        
        
    } else {
        
         $("#menu")
            .addClass("gone")
            .removeAttr("style", "display");

        $("#title")
            .removeClass("gone");
//            .css("font-size", "4em")
//            .css("position", "absolute")
//            .css("color", "#482728")
//        .css("top", "1em");
//        .css("background-color", ;
        

        
         $("header")
            .removeAttr("style", "box-shadow")
         .css("transition", "1s");
//             .css("height", "10em");
        
    }
    
//    https://jsfiddle.net/cse_tushar/Dxtyu/141/
    
//    $("a").each(function(){
//        $(this).removeClass("active");
//    })
//    $(this).addClass("active");
};



//width, heigh, translate and scale all derived from playing with this block http://bl.ocks.org/radiocontrolled/7698088

function drawChart() {
    currentWidthMap = parseInt(d3.select("#map1").style("width"), 10);


    currentHeightMap = parseInt(d3.select("#map1").style("height"), 10);

    widthGraph = currentWidthMap - margin.left - margin.right;
    heightGraph = currentHeightMap - margin.bottom - margin.top;

    projection = d3.geoAlbersUsa()
        .scale([currentWidthMap])
        .translate([widthGraph / 2, heightGraph / 2]);



    d3.selectAll("path")
        .enter()
        .append("path")
        .attr("d", path);
    
    
path = d3.geoPath(projection);


    //     d3.selectAll("svg")
    //         .attr("width", currentWidthMap)
    //        .attr("height", currentHeightMap);
    console.log("in draw chart");

}

drawChart();

window.addEventListener("resize", drawChart);



//function resize() {
//    console.log("RESIZED");
//    //code to calculate new width and height
//    width = window.innerWidth ||
//        document.documentElement.clientWidth ||
//        document.body.clientWidth;
//    //    width = document.getElementById("map1").clientWidth;
//    //    height = width/3.236;
//
//
//    height = window.innerHeight ||
//        document.documentElement.clientHeight ||
//        document.body.clientHeight;
//
//    w = width * .75;
//    h = height / 1.75; //height*1.2
//    w2 = width * .8;
//    //    w = width;
//    //    h = w;
//    //    w2 = w/2;
//
//    widthGraph = w2 - margin.left - margin.right - (legendWidth * 4);
//    heightGraph = h - margin.top - margin.bottom;
//    barwidth = 40;
//
//    //    console.log(w, h);
//
//    //projection scale translate
//    projection = d3.geoAlbersUsa()
//        .scale([w / 1.35])
////        .translate([w2 / 2 - (legendWidth * 2), h / 2]);
//     .translate([w2 / 2.8, h / 1.6]);
//
//
//
//    d3.selectAll("path")
//        .enter()
//        .append("path")
//        .attr("d", path);
//
//    path = d3.geoPath(projection);
//
//    //width and height to be applied: select svgs, give them width and heights.
//    d3.selectAll("svg").attr("width", w2).attr("height", h);
//    d3.selectAll("path").attr("d", path);
//
//    //    https://pudding.cool/process/responsive-scrollytelling/ 
//    //    d3.selectAll(".step")
//    //        .style("height", h + "px");
//
//}
//
//d3.select(window).on("resize", resize);
////window.onresize = resize();



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


    console.log(response);

}




scroller
    .setup({
        step: ".step",
        //        debug: true,
        offset: 0.35
    })
    .onStepEnter(handleStepEnter);

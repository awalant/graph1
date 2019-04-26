"use strict"

//This is how to set up the library Scrollama.
var scroller = scrollama();


//handleStepEnter is a function that takes the argument "response" which is the object tracked by scrollama, which says the element that's being passed, its number in the array, and what direction the user is scrolling.
function handleStepEnter(response) {    
    
       //if (response.index == 0){
    //    console.log("hello");
    //    } else if (response.index == 1){
    //        console.log("howdy");
    //    } else if (response.index == 2){
    //        console.log("adios");
    //    }
    //    

    //variable for tracking the name of the element being passed
    var scrollStep = d3.select(response.element);

    //variable for tracking the number of the element being passed. the 'data-step' is set by me in the HTML so the program can keep better track of what's going on, as per best practices outlined on Scrollama's github
    var scrollVal = scrollStep.attr('data-step');

    
    function changeCaption(){
        if (scrollVal == 1) {
            d3.select("#caption")
                .text("LOOK AT THIS STUFF");
        } else if (scrollVal == 2) {
            d3.select("#caption")
                .text("ISN'T IT NEAT");
        } else if (scrollVal == 3){
            d3.select("#caption")
                .text("WOULDN'T YOU SAY MY COLLECTION'S COMPLETE");
        }
    }
    changeCaption();

    console.log(response);

}


scroller
    .setup({
        step: ".step",
        debug: true,
        offset: 0.3
    })
    .onStepEnter(handleStepEnter);

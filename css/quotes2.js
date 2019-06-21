//when the page is ready, run this function

$(document).ready(function () {
    //               console.log("JQUERY WORKS");

    //run through the csv that's saved as the variable quotesData and for each element see if it applies to the topic (column name) and if yes, put it in that topic.
    for (var i = 0; i < quotesData.length; i++) {
//        console.log(quotesData[i]);

        //"the one that's in the index of the loop" // diff element in arra yeach time
        if (quotesData[i].consent == "yes") {
             consentQuotes.push(quotesData[i].quote);
            consentAuthors.push(quotesData[i].id);
            
//            console.log(consentQuotes.length);

            
//            renderQuote(quotesData[i].quote, "consent", i);
        }
//        
//        //if element[i] in array has its property lgbtq set to yes, then send through function renderQuote
//        if (quotesData[i].lgbtq == "yes") {
//            lgbtQuotes.push(quotesData[i].quote);
//            
////            console.log(lgbtQuotes.length);
//            
//            
////            renderQuote(quotesData[i].quote, "lgbtq", i);
//        }
//        //add conditions for other topics, one for each
////        
//        if (quotesData[i].sexEdu == "yes") {
////            console.log("yes to sex");
//            //add to array
//             sexEdQuotes.push(quotesData[i].quote);
//            
////            console.log(sexEdQuotes.length);
//            
//            
//            
////            renderQuote(quotesData[i].quote, "sexEdu", i);
//        }
//        
//          if (quotesData[i].sexAssault == "yes") {
//              sexAssaultQuotes.push(quotesData[i].quote);
//            
////            console.log(sexAssaultQuotes.length);
//  
//              
////            console.log("yes to sex");
////            renderQuote(quotesData[i].quote, "sexAssault", i);
//        }
        
//        if (quotesData[i].sexExp == "yes") {
//              sexExpQuotes.push(quotesData[i].quote);
//            
////            console.log(sexExpQuotes.length);
//
//            
////            console.log("yes to sex");
////            renderQuote(quotesData[i].quote, "sexExp", i);
//        }
        
        //make corrosponding divs
        //
        //how to structure data so doesn't have to happen???
        //renderquote, quote text, topics



    }
$("#consentBtn").click(renderQuote());
    
    //select the class .quote-topic-link when it's clicked, and change the topic to the topic of whatever button has been clicked, then run it through the function showTopic
//    $(".quote-topic-link").click(function (event) {
//        var topic = $(this).data("topic");
////        console.log(topic);
//
//        showTopic(topic);
//    });
    
    //initialize slick here
});

//create array to track the lgbtq relevant quotes
//var lgbtQuotes =[];
//console.log(lgbtQuotes);


//create array to track the consent relevant quotes
var consentQuotes = [];
console.log(consentQuotes);
//create array to track the consent relevant authors
var consentAuthors = [];
console.log(consentAuthors);
//
////create array to track the sex education relevant quotes
//var sexEdQuotes = [];
//console.log(sexEdQuotes);
//
////create array to track the sexual assault relevant quotes
//var sexAssaultQuotes = [];
//console.log(sexAssaultQuotes);
//
////create array to track the sexual experiences relevant quotes
//var sexExpQuotes = [];
//console.log(sexExpQuotes);





//pulling quote from above, as well as the topic
//function renderQuote() {
//    //each topic will have own class quote-[topic]
////    var element = $("<div>")
////        .addClass("quote")
////        .addClass("quote-" + topic);
//    var topic="consent";
//    
//    var element = $("#consentDiv")
//    .addClass("quote")
//    .addClass("quote-" + topic);
//    
//    //variable that collects the topic inside a jQuery selector
////    var container = $("#" + topic);
//    
//    
//    
////    if (topic === "consent"){
////        var randomNum = Math.floor(Math.random()*consentQuotes.length);
//        console.log("ello poppet");
//        
//        
////    }
//
//      //appends a div with the classes quote, and quote-[topic] to the div in the HTML already named for the topic
//    container.append(element);
//    
//    element.html("hi");
//
//}

//pass in topic into function to display
//function showTopic(topic) {
//    $(".topic").addClass("hidden");
//    $("#" + topic).removeClass("hidden");
//    
//    renderQuote(topic);
//}

//$("#consent").on("click", renderQuote(event));
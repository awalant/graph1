//when the page is ready, run this function

$(document).ready(function () {
    //               console.log("JQUERY WORKS");

    //run through the csv that's saved as the variable quotesData and for each element see if it applies to the topic (column name) and if yes, put it in that topic.
    for (var i = 0; i < quotesData.length; i++) {
        console.log(quotesData[i]);

        //"the one that's in the index of the loop" // diff element in arra yeach time
        if (quotesData[i].consent == "yes") {
            renderQuote(quotesData[i].quote, "consent", i);
        }
        
        //if element[i] in array has its property lgbtq set to yes, then send through function renderQuote
        if (quotesData[i].lgbtq == "yes") {
            lgbtQuotes.push(quotesData[i].quote);
            
            console.log(lgbtQuotes.length);
            
            var randomNum = Math.floor(Math.random()*lgbtQuotes.length);
            
            renderQuote(quotesData[i].quote, "lgbtq", i);
        }
        //add conditions for other topics, one for each
        
        if (quotesData[i].sexEdu == "yes") {
//            console.log("yes to sex");
            //add to array
            renderQuote(quotesData[i].quote, "sexEdu", i);
        }
        
          if (quotesData[i].sexAssault == "yes") {
//            console.log("yes to sex");
            renderQuote(quotesData[i].quote, "sexAssault", i);
        }
        
        if (quotesData[i].sexExp == "yes") {
//            console.log("yes to sex");
            renderQuote(quotesData[i].quote, "sexExp", i);
        }
        
        //make corrosponding divs
        //
        //how to structure data so doesn't have to happen???
        //renderquote, quote text, topics



    }

    
    //select the class .quote-topic-link when it's clicked, and change the topic to the topic of whatever button has been clicked, then run it through the function showTopic
    $(".quote-topic-link").click(function (event) {
        var topic = $(this).data("topic");
        console.log(topic);

        showTopic(topic);
    });
    
    //initialize slick here
});


//create array to track the lgbtq relevant quotes
var lgbtQuotes =[];

//pulling quote from above, as well as the topic
function renderQuote(quote, topic, i) {
//    console.log(quote);
    //variable that collects the topic inside a jQuery selector
    var container = $("#" + topic);

    //each topic will have own class quote-[topic]
    var element = $("<div>")
        .addClass("quote")
        .addClass("quote-" + topic)
        .html(quote);

    //appends a div with the classes quote, and quote-[topic] to the div in the HTML already named for the topic
    container.append(element);
}

//pass in topic into function to display
function showTopic(topic) {
    $(".topic").addClass("hidden");
    $("#" + topic).removeClass("hidden");
}

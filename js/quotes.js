$(document).ready(function () {
    //               console.log("JQUERY WORKS");

    for (var i = 0; i < quotesData.length; i++) {
        console.log(quotesData[i]);

        //"the one that's in the index of the loop" // diff element in arra yeach time
        if (quotesData[i].consent == "yes") {
            renderQuote(quotesData[i].quote, "consent", i);
        }
        
        //if element[i] in array has its property lgbtq set to yes, then send through function renderQuote
        if (quotesData[i].lgbtq == "yes") {
            console.log("yes to lgbtq");
            renderQuote(quotesData[i].quote, "lgbtq", i);
        }
        //add conditions for other topics, one for each
        //make corrosponding divs
        //
        //how to structure data so doesn't have to happen???
        //renderquote, quote text, topics



    }

    $(".quote-topic-link").click(function (event) {
        var topic = $(this).data("topic");
        console.log(topic);

        showTopic(topic);
    });
    
    //initialize slick here
});


//pulling quote from above
function renderQuote(quote, topic, i) {
    console.log(quote);
    //selector for jQuery
    var container = $("#" + topic);

    //each topic will have own class quote-[topic]
    var element = $("<div>")
        .addClass("quote")
        .addClass("quote-" + topic)
        .html(quote);

    container.append(element);
}

//pass in topic into function to display
function showTopic(topic) {
    $(".topic").addClass("hidden");
    $("#" + topic).removeClass("hidden");
}

$(document).ready(function () {
    for (var i = 0; i < quotesData.length; i++) {
        if (quotesData[i].consent == "yes") {
            consentQuotes.push({
                quote: quotesData[i].quote,
                id: quotesData[i].id
            });

        }

        if (quotesData[i].lgbtq == "yes") {
            lgbtqQuotes.push({
                quote: quotesData[i].quote,
                id: quotesData[i].id
            });
        }

        if (quotesData[i].sexEdu == "yes") {
            sexEduQuotes.push({
                quote: quotesData[i].quote,
                id: quotesData[i].id
            });
        }
        if (quotesData[i].sexExp == "yes") {
            sexExpQuotes.push({
                quote: quotesData[i].quote,
                id: quotesData[i].id
            });
        }
        if (quotesData[i].sexAssault == "yes") {
            sexAssaultQuotes.push({
                quote: quotesData[i].quote,
                id: quotesData[i].id
            });
        }

    }
});




//create array to track the consent relevant quotes
var consentQuotes = [];

var lgbtqQuotes = [];

var sexEduQuotes = [];

var sexAssaultQuotes = [];

var sexExpQuotes = [];
//        console.log(lgbtqQuotes);


$(".quoteBtn").click(
    function (event) {
        var topic = $(this).data("topic");
        console.log(topic);

        showTopic(topic);

        var randomNum;
        var quote;
        var author;
        var array;
        //        console.log("where in the world is carmen sandiego");

        if (topic === "consent") {
            array = consentQuotes;
        }
        if (topic === "lgbtq") {
            array = lgbtqQuotes;
        }
        if (topic === "sexEdu") {
            array = sexEduQuotes;
        }
        if (topic === "sexExp") {
            array = sexExpQuotes;
        }
        if (topic === "sexAssault") {
            array = sexAssaultQuotes;
        }

        randomNum = Math.floor(Math.random() * array.length);
        
        
        quote = '"' + array[randomNum].quote + '"';
        author = " —" + array[randomNum].id;
        
//        http://www.scriptingmaster.com/javascript/formatting-text-JavaScript.asp
        authorStyled = author.bold();

        $("#" + topic).html(quote + authorStyled);

    }

);

function showTopic(topic) {
    $(".topic").addClass("hidden");
    $("#" + topic).removeClass("hidden");
    console.log("SHOWING" + topic);
}

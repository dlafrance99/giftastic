
//starting array of characters
var topics = ["Captain America", "Ironman", "Thor", "Spiderman", "Black Widow", "Hulk", "Ant-man", "Black Widow"];

// Creates buttons for starting array
function renderbuttons() {
    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append("<button class='heroButton' data-name='" + topics[i] + "'>" + topics[i] + "</button>");
    }
};

// adds a button from the user input
$("#add-avenger").on("click", function (event) {
    event.preventDefault();
    if ($("#avenger-input").val() === "") {
        return;
    }

    var newAvenger = $("#avenger-input").val().trim();


    $(".buttons").append("<button class='heroButton' data-name='" + newAvenger + "'>" + newAvenger + "</button>");

    $("#avenger-input").val("");

});

// adds gifs from the button click
$(document).on("click", ".heroButton", function () {
    var name = $(this).attr("data-name").replace(/\s/g, "");
    console.log(name);
    var apiKey = "c9PIZXqBEP8anXAx05sq9WK1XWKwjREL";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + apiKey + "&limit=10";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gifDiv'>");
                var rating = results[i].rating.toUpperCase();
                var heroImg = $("<img>");
                var p = $("<p class='rating'>").text("Rating: " + rating);
                heroImg.attr("src", results[i].images.original_still.url);
                heroImg.attr("data-still", results[i].images.original_still.url);
                heroImg.attr("data-animated",results[i].images.original.url);
                heroImg.attr("data-state", "still");
                heroImg.addClass("gif");
                gifDiv.prepend(heroImg);
                gifDiv.prepend(p);

                $(".imagesHere").prepend(gifDiv);

            }


        });

});

$(document).on("click", ".gif", function () {
    var still = $(this).attr("data-still");
    console.log(still);
    var animated = $(this).attr("data-animated");
    console.log(animated);
    var state = $(this).attr("data-state");
    // console.log(state);
    if (state === "still") {
        $(this).attr("src", animated);
        $(this).attr("data-state", "animated");

        state = "animated";
        console.log(state);
    } else if (state === "animated"){
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
        state = "still";
        console.log(state);
    }
});

renderbuttons();
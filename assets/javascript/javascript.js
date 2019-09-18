var topics = ["Captain America", "Ironman", "Thor", "Spiderman", "Black Widow", "Hulk", "Ant-man", "Black Widow"];

function renderbuttons() {
    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append("<button>" + topics[i] + "</button>");
    }
};

$("#add-avenger").on("click", function (event) {
    event.preventDefault();
    if ($("#avenger-input").val() === ""){
        return;
    }

    var newAvenger = $("#avenger-input").val().trim();


    $(".buttons").append("<button>" + newAvenger + "</button>");

    $("#avenger-input").val("");

});

renderbuttons();
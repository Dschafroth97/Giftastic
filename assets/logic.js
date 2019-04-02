$(document).ready(function() {

    var words = [
        "dog", "cat", "hamster", "turtle", "bird", "teacup pig",
        "snake", "bear", "salamander", "frog", "ferret", "sugar glider",
        "skunk", "goldfish", "penguin", "owl", "bearded dragon", "rabbit"
    ];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i=0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.addClass("btn ml-1 btn-outline-success");
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }
    populateButtons(words, "words-button", "#gifButtons");
});
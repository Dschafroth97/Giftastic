// make sure html is loaded first
$(document).ready(function () {

    // pre-defined buttons array
    var words = [
        "dog", "cat", "tron", "star wars", "adventure", "teacup pig",
        "bear", "tacos", "ferret", "pizza", "bearded dragon"
    ];

    // get buttons onto page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        // for loop adding a button with appropriate attr and classes for each word in array
        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.addClass("btn ml-1 mb-1 btn-outline-success");
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    };

    $(document).on("click", ".gifButton", function () {
        $(".gifButton").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=sUMgeo9IDAVDrs2knnCCgsvcN5gmSdbV&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class=\"gif-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var gifImage = $("<img>");
                    gifImage.attr("src", still);
                    gifImage.attr("data-still", still);
                    gifImage.attr("data-animate", animated);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("gifImage");


                    gifDiv.append(gifImage);
                    gifDiv.append(p);

                    $("#gifDisplay").prepend(gifDiv);

                }
            });
    });

    $(document).on("click", ".gifImage", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animated")
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")

        }
    });

    $("#addGif").on("click", function (event) {
        event.preventDefault();
        var newWord = $("input").eq(0).val();

        if (newWord.length > 1) {
            words.push(newWord);
        }

        populateButtons(words, "gifButton", "#gifButtons");

    });

    $(document).on("click", "#clearGif", function() {
        $("#gifDisplay").empty();
    });

    // populate buttons from pre-defined array when page loads
    populateButtons(words, "gifButton", "#gifButtons");
});
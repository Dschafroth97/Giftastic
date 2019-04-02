// make sure html is loaded first
$(document).ready(function() {

    // pre-defined buttons array
    var words = [
        "dog", "cat", "hamster", "turtle", "bird", "teacup pig",
        "bear", "salamander", "ferret", "sugar glider",
    ];

    // get buttons onto page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        // $(areaToAddTo).empty();

        // for loop adding a button with appropriate attr and classes for each word in array
        for (var i=0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.addClass("btn ml-1 mb-1 btn-outline-success");
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    };

    $(document).on("click", ".gifButton", function() {
        $(".gifButton").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=sUMgeo9IDAVDrs2knnCCgsvcN5gmSdbV&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response);
                var results = response.data;

                for (var i=0; i < results.length; i++) {
                    var gifDiv = $("<div class=\"gif-item\">");
                    gifDiv.addClass("card");
                
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
                    gifDiv.prepend(p);

                    $("#gifDisplay").prepend(gifDiv);

                }
            });
    });



    // populate buttons from pre-defined array when page loads
    populateButtons(words, "gifButton", "#gifButtons");
});
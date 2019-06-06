
// Example of an API query for ingredients chicken, mushrooms, garlic
// https://api.edamam.com/search?q=chicken,garlic,mushrooms&app_id=a2545d79&app_key=f43e58c104b981cd9a7ef77393c1cbad

// Initialize query string
var baseQuery = "https://api.edamam.com/search?q=";
var apiKey = "f43e58c104b981cd9a7ef77393c1cbad";
var appId = "a2545d79";
var ingrSearch = "";

// Click handler for ingredients submit button

$(".btn").on("click", function(e) {
e.preventDefault();

// Save list of ingredients
ingrSearch = $("#ingredientList").val().trim();
console.log(ingrSearch);

// Construct new query string with user inputs
var newURL = baseQuery + ingrSearch + "&app_id=" + appId + "&app_key=" + apiKey;

// Ajax call
$.ajax({
    url: newURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // List each recipe
    var numRecipes = response.hits.length;
    console.log(numRecipes);
    for (var i = 0; i < numRecipes; i++) {
        var recipe = response.hits[i].recipe.url
        console.log(recipe); 

        var recipeDiv = $("<div>");
        recipeDiv.text(recipe);
        // Adding the button to the HTML
        $("#recipeList").append(recipeDiv);
    }

});

});

// User inputed ingredients into an array
// String of the array into the queryURL as ingrSearch

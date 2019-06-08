// Recipe Search Page

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

  // Clear out previous list of ingredients
  $("#fridgeIngredients").empty();

  // Grab list of ingredients from user input
  ingrSearch = $("#ingredientList").val().trim();
  console.log(ingrSearch);

  // Clear out text box
  $("#ingredientList").empty();

  // List out searched ingredients
  // Save string of all ingredients in an array
  var ingrArray = ingrSearch.split(',');
  console.log(ingrArray);

  // Create div and list out every ingredient
  for (i=0; i<ingrArray.length; i++) {
    var ingrDiv = $('<div/>', {
      text: ingrArray[i],
      id: 'ingrDiv'+i
    });
    // Create span to delete
    var ingrSpan = $('<span/>', {
      text: 'x',
      id: 'deleteIngr'
    });
    // Append span to div
    ingrDiv.append(ingrSpan);
    $("#fridgeIngredients").append(ingrDiv);
  };

  // Construct new query string with user inputs
  var newURL = baseQuery + ingrSearch + "&app_id=" + appId + "&app_key=" + apiKey;

  // Ajax call to Edamam API to grab recipes
  $.ajax({
      url: newURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      // List each recipe
      var numRecipes = response.hits.length;
      console.log(numRecipes);
      for (var i = 0; i < numRecipes; i++) {

        // Create div to dynamically list recipes
        var recipeDiv = $("<div>");
        // Label tag for recipes
        var recipeLabel = $("<p>").text(response.hits[i].recipe.label);
        // Image tag for recipes
        var recipeImg = $("<img>");
        recipeImg.attr("src",response.hits[i].recipe.image);

        // Create anchor tag for the recipeDiv
        var recipeAnchor = $("<a>");
        // Set src attribute of recipe URL to the anchor tag
        recipeAnchor.attr("href", response.hits[i].recipe.url);
        console.log(response.hits[i].recipe.url); 

        // Append label and image to the div
        recipeDiv.append(recipeLabel);
        recipeDiv.append(recipeImg);
        
        // Append div recipeDiv to the recipeAnchor
        recipeAnchor.append(recipeDiv);

        // Adding the button to the HTML
        $(".recipeList").append(recipeAnchor);
      };

  });

});

// Click handler for removing ingredient(s)
$(document).on("click", "#deleteIngr", function(e) {
  e.preventDefault();
  console.log(this);
  $(this).closest("div").remove();
});

// TO DO: 
// Make exception cases for if user puts in , at the end of ingredient list
// Duplicated ingredients

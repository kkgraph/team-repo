// Recipe Search Page

// Example of an API query for ingredients chicken, mushrooms, garlic
// https://api.edamam.com/search?q=chicken,garlic,mushrooms&app_id=a2545d79&app_key=f43e58c104b981cd9a7ef77393c1cbad

// Initialize query string
var baseQuery = "https://api.edamam.com/search?q=";
var apiKey = "f43e58c104b981cd9a7ef77393c1cbad";
var appId = "a2545d79";
var ingrSearch = "";
var ingrArray = [];
var uid;

// --------firebase logic for user----------
// On click event for the Sign In button
$(document).on("click", "#signUpBtn", function (event) {
  event.preventDefault();
  newUserSignUp()
  $("#newUserEmail").val("");
  $("#newUserPassword").val("");
});

$(document).on("click", "#signIn", function (event) {
  event.preventDefault();
  userSignIn()
  $("#email").val("");
  $("#password").val("");
});

// Sign Out Function
$(document).on("click", "#signOut", function(event){
event.preventDefault();
firebase.auth().signOut();
console.log("user signed out")
})

// Click handler for ingredients submit button
$(".ingrSubmit").on("click", function(e) {
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
  ingrArray = ingrSearch.split(',');
  console.log(ingrArray)

  // Gets current firebase user
  var user = firebase.auth().currentUser;
  if (user != null) {
    uid = user.uid;
  }
 console.log("user id:" + uid)
  // Adds ingrArray to the Firebase
  firebase.database().ref('user-ingrList/' + uid).push({
    ingrList: ingrArray,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  
  console.log("firebase fired")

  // console.log("firebase fired")

// Create div and list out every ingredient
for (i=0; i<ingrArray.length; i++) {
  var ingrDiv = $('<div/>', {
    text: ingrArray[i],
    id: 'ingrDiv'+i,
    class: 'list-item',
    value: ingrArray[i]
  });

  // Create span to delete
  var ingrSpan = $('<span/>', {
    text: 'X',
    id: 'deleteIngr',
    class: 'list-delete-btn',
    value: ingrArray[i],
  });
  // Append span to div
    ingrDiv.append(ingrSpan);
    $("#fridgeIngredients").append(ingrDiv);
  };

  // API call
  runRecipes(ingrSearch);
});

// Click handler to delete ingredients
$(document).on("click", "#deleteIngr", function (e) {
  e.preventDefault();

  // Grab removed ingredient and remove from array
  var ingrVal = $(this).closest("div").attr("value");
  console.log(ingrVal);
  var ingrPos = ingrArray.indexOf(ingrVal);
  console.log(ingrPos);
  ingrArray.splice(ingrPos, 1);
  console.log(ingrArray);

  // Remove div of item
  $(this).closest("div").remove();

  ingrSearch = ingrArray.toString();
  console.log(ingrSearch);

  // Empty recipes div
  $(".recipeList").empty;

  // Recall API to retrieve recipes
  runRecipes(ingrSearch);
});

// Function to call API & run recipes
function runRecipes(ingrSearch) {
  
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
        var recipeLabel = $("<h3>").text(response.hits[i].recipe.label);
        // Image tag for recipes
        var recipeImg = $("<img class='resimg img-round'>");
        recipeImg.attr("src",response.hits[i].recipe.image);

        // List ingredients  
        var getIngr = response.hits[i].recipe.ingredientLines;      
        // var ingrListArray = getIngr.split(',');
        // console.log(ingrListArray);

        var recipeIngrs = $("<span>").text("Ingredients: " + getIngr);
          // for (var j = 0; j < ingrListArray.length; j++) {
          //   var recipeIngrs = $("<ul>").text("Ingredients: " + getIngr);
          // };

        // Create anchor tag for the recipeDiv
        var recipeAnchor = $("<a>");
        // Set src attribute of recipe URL to the anchor tag
        recipeAnchor.attr("href", response.hits[i].recipe.url);
        recipeAnchor.attr("target", "_blank")
        console.log(response.hits[i].recipe.url); 

        // Append label, image, ingredients to the recipe div
        recipeDiv.append(recipeLabel);
        recipeDiv.append(recipeImg);
        recipeDiv.append(recipeIngrs);
        
        // Append div recipeDiv to the recipeAnchor
        recipeAnchor.append(recipeDiv);

        // Adding the button to the HTML
        $(".recipeList").append(recipeAnchor);
      };

  });

};

// Click handler for removing ingredient(s)
$(document).on("click", "#deleteIngr", function(e) {
  e.preventDefault();
  console.log(this);

  // Grab removed ingredient and remove from array
  var ingrVal = $(this).closest("div").attr("value");
  console.log (ingrVal);
  var ingrPos = ingrArray.indexOf(ingrVal);
  console.log(ingrPos);
  ingrArray.splice(ingrPos, 1);
  console.log(ingrArray);
  
  // Remove div of item
  $(this).closest("div").remove();

});

// TO DO: 
// Divide up the code
// Make exception cases for if user puts in , at the end of ingredient list
// Duplicated ingredients



//ZOMATO PAGE API/AJAX

//starting the API when page is ready
$(document).ready(function() {

  //on click function and finding the input 
  $("#btnMessage").on("click", function() {
   var valueSearchBox = $("#getText").val()
   if (valueSearchBox === "") {
    return;
   }
   select();
  });

  //search by city
  function select() {
          //creating 
   var valueDropdown = $("#selectId").val();
   var valueSearchBox = $("#getText").val();
   var searchCuisine = "&q=" + valueSearchBox;
   var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://developers.zomato.com/api/v2.1/search?entity_id=" + valueDropdown + "&entity_type=city" + searchCuisine + "&count=100", //SEARCH URL
    "method": "GET",
    "headers": {
     "user-key": "d72ed58b185d32d281791431f0cfb193", //API KEY
     "Content-Type": "application/x-www-form-urlencoded"
    }
   }
  console.log("valueDropdown", valueDropdown);
  console.log("searchCuisine", searchCuisine);
  console.log("valueSearch", valueSearchBox);
 
   //sorting out the JSON that is returned 
   $.getJSON(settings, function(data) {
 
    data = data.restaurants;
    var html = ""; //creating html variable so that i can create the html to add to the div below 
 
    $.each(data, function(index, value) {
 
     var x = data[index];
     $.each(x, function(index, value) {
        var location = x.restaurant.location;
        var userRating = x.restaurant.user_rating;

//adding html to the html var
        html += "<div class='data img-rounded'>"; //image class started
        html += "<div class='rating'>"; //rating class

        html += "<span title='" + userRating.rating_text + "'> <p style='color:white;background-color:#" + userRating.rating_color + ";border-radius:4px;border:2px;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'> <strong>" + userRating.aggregate_rating + "</strong></p></span><br>"; //this creates the area for the rating to be shown 

        html += "  <strong class='text-info'>" + userRating.votes + " votes</strong>"; //includes the vote data

        html += "</div>"; // ends the rating and votes div 

        html += "<img class='resimg img-round' src=" + value.thumb + " alt='Restaurant Image' height='165' width='165'>"; //starts the image area -- the img-round is the round image class and resimg-resizes the images

        html += "<a href=" + value.url + " target='_blank' class='action_link'><h2 style='color:navy;'><strong>" + value.name + "</strong></h2></a>"; //this creates the action that allows users to click on the title and go to the restaurant on a new page 

        html += "  <strong class='text-primary'>" + location.locality + "</strong><br>"; //adds the location

        html += " <span>" + location.address + "</span><br><br>"; //adds the address

        html += "  <strong>CUISINES</strong>: " + value.cuisines + "<br>"; //adds the cuisine types for the restaurant

        html += "  <strong>COST FOR TWO</strong>: " + value.currency + value.average_cost_for_two + "<br>"; //adds the cost for 2 people in local currency

        html += "</div><br>"; //ends overall div

     });
    });
    $(".message").html(html); //adding to the message div 
   });
 
  }
  //select places
  $("#selectId").change(function() {
   select();
  });
 });


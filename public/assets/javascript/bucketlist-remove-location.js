// Remove a Location from the user's Bucketlist 
 
$(document).on('click', '.plusMinusIcon', function() {

  // Get the location type and its Id
  var locationType = $(this).data("locationtype")
  var locationId = $(this).data("locationid")

  // Get the current user's Id (to avoid showing their name in the list later)
  var currentUserId = $(this).data("userid");

  // Query the correct Table in the DB (use window location so it works in heroku and localhost)
  var queryURL = window.location.origin + '/remove/' + locationType + '/' + currentUserId + '/' + locationId;

  $.ajax({url: queryURL, method: 'GET'}).done(function(response){
    // Refresh the page after AJAX call is done
    window.location.reload();
  })

});
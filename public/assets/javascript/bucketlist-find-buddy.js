// Append mutual travlers to the modal (and open/close the modal)

$(document).on('click', '.buddyButton', function() {

  // Get location name and append to modal title
  var locationName = $(this).data("locationname");
  $("#modalTitle").text("Your Travel Buddies for " + locationName);

  // Get the location type and its Id
  var locationType = $(this).data("locationtype");
  var locationId = $(this).data("locationid");

  // Get the current user's Id (to avoid showing their name in the list later)
  var currentUserId = $(this).data("userid");


  // Query the correct Table in the DB (use window location so it works in heroku and localhost)
  var queryURL = window.location.origin + '/find-all-users/' + locationType + '/' + locationId;
  $.ajax({url: queryURL, method: 'GET'}).done(function(response){

    //console.log(response[0].Users)

    // If there is only 1 user in the response, no other ppl want to go there... yet
    if(response[0].Users.length == 1){
      $('#buddyTable').empty();
      $('#buddyTable').append("<p>Sorry! No other users want to travel here yet.</p>");
    }
    // Otherwise, Iterate through the JSON response and append all users
    else{
      $('#buddyTable').empty();
      $('#buddyTable').append("<tr><td>Buddy Name</td><td>Buddy Email</td></tr>")

      for(var i=0; i < response[0].Users.length; i++){

        // Omit the JSON where the current user is (no need to see their own info)
        if(response[0].Users[i].id != currentUserId){

          // Create Entries for Buddy Table
          var newRow = $('<tr>');

          // Create New HTML Data Cells (done for each value from Firebase)
          var buddyName = $('<td>');
          var buddyEmail = $('<td>');

          // Add text to the HTML Data Cells
          buddyName.text(response[0].Users[i].firstName + " " + response[0].Users[i].lastName);
          buddyEmail.text(response[0].Users[i].email);

          // Append HTML Data Cells to the new Row
          newRow.append(buddyName);
          newRow.append(buddyEmail);

          // Append new Row to the HTML Table
          $('#buddyTable').append(newRow);

        }

      }

    }

  });

  // Finally, after the AJAX call, open the modal to display mutual buddies
  $('#modal1').openModal();
  
});
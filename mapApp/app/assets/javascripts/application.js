// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
var map;
var go_button;
function initMap() {
  centerMap();
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13
  });

   showPlaces();

}

function centerMap() {
      var geocoder = new google.maps.Geocoder();
      var user_inputted_address = gon.search_test;
      if (user_inputted_address == '') {
        window.alert('You must enter an area, or address.');
      } else {
        // Geocode the address/area entered to get the center. Then, center the map
        // on it and zoom in
        geocoder.geocode(
          { address: user_inputted_address,
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var starting_coordinates = results[0].geometry.location
              map.setCenter(starting_coordinates);
              map.setZoom(13);
              //this makes the actual marker for their address
              var starting_point = new google.maps.Marker({
                  position: starting_coordinates,
                  map: map,
                  title: 'Your starting point: ' + user_inputted_address,
              });
              //creates the inputted address's info window
              var startingPointInfoWindow = new google.maps.InfoWindow();
            } else {
              window.alert('We could not find that location - try entering a more' +
                  ' specific place.');
            }
          });
      }
    }

    function showPlaces() {
      var markers = []
      var latitudes_array = gon.latitudes
      var longitudes_array = gon.longitudes
      var names_array = gon.names
      for (var i = 0; i < latitudes_array.length; i++) {
              // Get the position from the location array.
              var latitude = latitudes_array[i];
              var longitude = longitudes_array[i];
              var name = names_array[i];
              var position = new google.maps.LatLng(latitude, longitude);
              // Create a marker per location, and put into markers array.
              var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: name
              });
              // Push the marker to our array of markers.
              markers.push(marker);
            }
            // Extend the boundaries of the map for each marker

    }

    $(document).ready(function() {

    });

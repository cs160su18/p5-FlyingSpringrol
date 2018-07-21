var clickedLat; //set on marker clicks
var clickedLong;
var notes = {};
var map;
var addedListElems = {};
var firstRefresh = true;

var urls = window.location.pathname.split("/");
var CURRENT_MAP_ID = urls[urls.length-2]; //second to last for some reason
var listHead = document.getElementById("list_holder");

console.log("callled");

$(window).on('resize', function(){
      $("#mapwrapper").width(window.innerWidth).height(window.innerHeight*.95); //the .95 is to prvent full rescaling

});

$("#mapwrapper").width(window.innerWidth).height(window.innerHeight*.95);


function parseNotes(data){
  for (var i=0; i < data.length; i++){
     var note = data[i].fields;
     var name = String(note.name); //wtf dude x2
     var latitude = parseFloat(note.lat);
     var longitude = parseFloat(note.long);
     var latlong = String(latitude)+ String(longitude);
     var note_text = note.note; //wtf dude
     var item = {
        lat: latitude,
        long:longitude,
        note: note_text,
        username: name
     };
     notes[latlong] = item; //key latlong to item
     createMarker(latitude, longitude);
  }
  if (firstRefresh){
       setCenter();
       firstRefresh=false;
  }
}
function setCenter(){
   var averageLat = 0;
   var averageLong = 0;
   var count = 0;
   for (var key in notes){
    //calc lat long
      if(!isNaN(notes[key].lat)) averageLat += notes[key].lat;
      if(!isNaN(notes[key].long)) averageLong += notes[key].long;
      count++;
   }
   if (count==0){ //if no notes
      var myLatlng = new google.maps.LatLng(37.77, -122.044); //SF lat lng
      map.setZoom(10);
      map.setCenter(myLatlng);//map = global variable
      return;
   }
   else{
       averageLat = averageLat/count;
       averageLong = averageLong/count;
       var averageCenter = new google.maps.LatLng(averageLat, averageLong);
       map.setZoom(13);
       map.setCenter(averageCenter);//map = global variable
   }
}
function refresh(){
     //construct data structure from the notes gotten from the server
    var refresh = "/life/refresh";
    var jqxhr = $.get(refresh, function(data) {
     }).done(function(data) {
        console.log(data);
        parseNotes(data);
     })
      .fail(function() {
      })
      .always(function() {
      });

    jqxhr.always(function() {

    });
}

function showNote(key){
     //do nothign for now
     //iterate through the keys, find the relevant one, and display
     var item = notes[key];

     if (item){
        $("#notedata").text(item.note); //set text
        $("#leaversname").text(item.username); //set text
        $("#noteread").modal('show'); //assumes they'll close it after they're done
        var noteCenter = new google.maps.LatLng(item.lat, item.long);
        map.setCenter(noteCenter); 
        map.setZoom(15);
     }

 }
function createMarker(latitude, longitude){
        //used in the refres function;
     var latlng = {lat: latitude, lng: longitude};
     var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: 'marker'
      });
      marker.addListener('click', function(evt){
         var latLng = marker.getPosition();
         var markerKey = String(latLng.lat()) + String(latLng.lng());
         showNote(markerKey); //which takes the set lat and long, and displays a note
      });
 }

 /*Drag select code */

var bin = document.querySelector('#mapwrapper');

function point2LatLng(point, map) {
  if(!map){
    return null;
  }
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
  return map.getProjection().fromPointToLatLng(worldPoint);
}

bin.addEventListener('dragover', function (e) {
  if (e.preventDefault) e.preventDefault(); // allows us to drop
  this.className = 'over';
  e.dataTransfer.dropEffect = 'copy';
  return false;
});

bin.addEventListener('drop', function (e) {
  var p = new google.maps.Point(e.x, e.y);
  var latlng = point2LatLng(p, map);
  e.dataTransfer.dropEffect = 'copy';
  clickedLat = latlng.lat();
  clickedLong = latlng.lng();
  $("#newNote").modal('show');
  return false;
});

    //currently not called, checking on the input dilemma
function initMap() {
      $("#name").val(" ");
      $("#note").val(" ");
      $("#toolTip").modal('show'); //assumes they'll close it after they're done
      var myLatlng = {lat: -25.363, lng: 131.044}; //just default, resets during load
      var mapOptions = {
         disableDoubleClickZoom: false,
         zoomControl:true,
         clickableIcons: false
      }
      map = new google.maps.Map(document.getElementById('map'), {
             zoom: 4,
             center: myLatlng,
             gestureHandling: 'greedy',
             styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#1b99f9'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

      });
      var input = document.getElementById('place-input');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      map.setOptions(mapOptions);

      var searchBox = new google.maps.places.SearchBox(input);

      map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener('places_changed', function() {
         var places = searchBox.getPlaces();
         if (places.length == 0) {
           return;
         }

         // For each place, get the icon, name and location.
         var bounds = new google.maps.LatLngBounds();
         places.forEach(function(place) {
           if (!place.geometry) {
             console.log("Returned place contains no geometry");
             return;
           }

           if (place.geometry.viewport) {
             // Only geocodes have viewport.
             bounds.union(place.geometry.viewport);
           } else {
             bounds.extend(place.geometry.location);
           }
         });
         map.fitBounds(bounds);
      });


      $("#postnote").on("click", function(evt){
         var note = $("#note")["0"].value;
         var name = $("#name")["0"].value;
          console.log(name);
         note = note.trim();
         var formData = {
           note: String(note),
           long: clickedLong,
           lat: clickedLat,
           name: name,
         }
         $.post('/life/postnote', JSON.stringify(formData), function(data){
            $("#newNote").modal('hide');
            refresh();
         });
        //set the fields to blank
         $("#name").val(" ");
         $("#note").val(" ");
      });
      refresh(); //refresh after the map is initialized!
}


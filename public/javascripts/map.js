$(function() {
  
  function initialize() {
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 12,
      center: {lat: 37.7749, lng: -122.4194}
    });
    $.get('/places/data').done(placesObj =>
      placesObj.places.forEach((place,index) => {
      console.log(place);
      var marker = new google.maps.Marker({
        position: {lat: Number(place.lat), lng: Number(place.lng)},
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
        visible: true
      });
      marker.setMap(map);
    }));
  }
  initialize();
});

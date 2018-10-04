var temp;
var tempC;
var tempF;

window.onload = function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      geolocationSuccess,
      geolocationFailure
    );
    $(".degrees").text("Идет поиск");
  } else {
    $(".degrees").text("Ваше устройство не поддерживает геолокацию");
  }
};
$(".button-c").click(function(event) {
  event.preventDefault;
  $(".degrees").text(tempC);
  $(this).addClass('active');
  $('.button-f').removeClass('active');
});
$(".button-f").click(function(event) {
  event.preventDefault;
  $(".degrees").text(tempF);
  $(this).addClass('active');
  $('.button-c').removeClass('active');
});
function geolocationSuccess(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  var url =
    "https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat;
  $.getJSON(url, function(json) {
    temp = json.main.temp;
    tempC = Math.round(temp);
    tempF = Math.round(temp * 1.8 + 32);
    $(".degrees").text(tempC);
    $(".district").text(json.name + ", ");
    $(".country").text(json.sys.country);
    $(".weather").text(json.weather[0].main);
    $(".icon").attr("src", json.weather[0].icon);
  });
}
function geolocationFailure() {
  $(".degrees").html("Ошибка геолокации");
}
function toggleTemp() {
  $(".toggle").toggleClass("f");
  if ($(".toggle").is(".f")) {
    $(".degrees").text(tempF);
    $(".toggle").text("F");
  } else {
    $(".degrees").text(tempC);
    $(".toggle").text("C");
  }
}

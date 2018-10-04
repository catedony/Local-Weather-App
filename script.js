var tempC;
var tempF;
var body = document.querySelector('.body');
var degrees = document.querySelector(".degrees");
var btnC = document.querySelector('.button-c');
var btnF = document.querySelector('.button-f');
var district = document.querySelector('.district');
var country = document.querySelector('.country');
var weather = document.querySelector('.weather');
var icon = document.querySelector('.icon');

window.onload = function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      geolocationSuccess,
      geolocationFailure
		);
		document
    degrees.innerHTML = "Идет поиск";
  } else {
		degrees.innerHTML = "Ваше устройство не поддерживает геолокацию";
  }
};

btnC.onclick = function(e) {
	e.preventDefault();
	degrees.innerHTML = tempC;
	this.classList.add('active');
	btnF.classList.remove('active');
}

btnF.onclick = function(e) {
	e.preventDefault();
	degrees.innerHTML = tempF;
	this.classList.add('active');
	btnC.classList.remove('active');
}
function getData(position){
	return new Promise(function(resolve){
		var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  var url =
		"https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat;
		fetch(url)
		.then(function (result) {
			return result.json();
		})
		.then(function (json) {
		var temp = json.main.temp;
    tempC = Math.round(temp);
		tempF = Math.round(temp * 1.8 + 32);
		degrees.innerHTML = tempC;
		district.innerHTML = json.name + ", ";
		country.innerHTML = json.sys.country;
		weather.innerHTML = json.weather[0].main;
		icon.src = json.weather[0].icon;
		resolve(json.weather[0].main);
		})
	});
}

function geolocationSuccess(position){
	getData(position)
		.then(function (data) {
			switch (data) {
				case 'Rain':
					body.style.backgroundImage = 'url(img/' + data + '.jpg)';
					break;
				case 'Drizzle':
					body.style.backgroundImage = 'url(img/' + data + '.jpg)';
					break;
				case 'Clouds':
					body.style.backgroundImage = 'url(img/' + data + '.jpg)';
					break;
				case 'Snow':
					body.style.backgroundImage = 'url(img/' + data + '.jpg)';
					break;
				case 'Clear':
					body.style.backgroundImage = 'url(img/' + data + '.jpg)';
					break;
					case 'Thunderstom':
					body.style.backgroundImage = 'url(img/' + data + '.jpg)';
					break;
			}
		})
	};


function geolocationFailure() {
	degrees.innerHTML = "Ошибка геолокации";
}


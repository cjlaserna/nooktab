// weather
var weatherp = document.getElementById('weatherupdate');

// location
function getLocation() {
	var options = { 
        enableHighAccuracy: true
    }; 
	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		var coordinates = [lat, lng];  
		getCity(coordinates); 
		return; 
	} 

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error, options); 
}

// get city from geolocation
function getCity(coordinates) { 
	console.log(coordinates);
    var xhr = new XMLHttpRequest(); 
    var lat = coordinates[0]; 
    var lng = coordinates[1]; 
  
    // Paste your LocationIQ token below. 
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.a54f22282fbe3d31759b484a1ac4d18e&lat=" + 
    lat + "&lon=" + lng + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            var city = response.address.city;  
            weatherBalloon(city); 
            return; 
        } 
    } 
} 
// end of location

// actual weather
function weatherBalloon(city) {
  var key = '125d1f63ae71d7f82228f7409e3041ee';
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)  
  .then(function(resp) { return resp.json() })
  .then(function(data) {
    updateweather(data);
  })
  .catch(function() {
    // error
  });
}

function updateweather(d) {
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	weatherupdate.textContent = fahrenheit + '\u00B0' + " - " + d.weather[0].description;
}

getLocation();
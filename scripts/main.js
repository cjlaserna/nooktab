var timep = document.getElementById('timeupdate');
// input.addEventListener('input', search);
const input = document.getElementById('searchbarvalue');

input.onkeydown=function(e){
	if(e.keyCode == 13){
		search(searchbarvalue.value);
	}
};
// search bar
function search(input){
	window.location.href = "https://www.google.com/search?q=" + input;
}

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

// time
function time() {
	var time = dayjs().format(' HH:mm');
	time = time.split(':'); // convert to array

	var h = Number(time[0]);
	var m = Number(time[1]);
	var timeNew;

	if (h > 0 && h <= 12) {
	  timeNew= "" + h;
	} else if (h > 12) {
	  timeNew= "" + (h - 12);
	} else if (h == 0) {
	  timeNew= "12";
	}
	 
	timeNew += (m < 10) ? ":0" + m : ":" + m;
	timeNew += (h >= 12) ? " PM" : " AM";
	
	timep.textContent = timeNew;
}

function music(){
	var hour= dayjs().format('HH:mm');
	hour = hour.split(':'); // convert to array
	var h = Number(hour[0]);
	var timeNew;
	
	if (h > 0 && h <= 12) {
	  timeNew= "" + h;
	} else if (h > 12) {
	  timeNew= "" + (h - 12);
	} else if (h == 0) {
	  timeNew= "12";
	}
	
	timeNew += (h >= 12) ? "PM" : "AM";
	
	try if (sound.playing() = true){
		sound.stop();
	}catch{
		//pass
	}
	
	var sound = new Howl({
		src: ['music/' + timeNew + '.mp3'],
		autoSuspend: false,
		autoplay:true,
		loop:true
	});

	sound.play();
}

var fishcounter;
var counterelem =  document.getElementById("counterelement");

function updateCounter(fish){
	fish = parseInt(fish, 10);
	if (fish < 10) {
		counterelem.innerHTML = "0" + fish.toString();
	}else if(fish > 99){
		sessionStorage.setItem("fish", 0);
		fishcounter = 0;
	}else{
		counterelem.innerHTML = fish.toString();
	}
}

if (sessionStorage.getItem("fish")) {
   fishcounter = sessionStorage.getItem("fish");
   updateCounter(fishcounter);
}else{
	fishcounter = 0;
	updateCounter(fishcounter);
}

function addFish(){
	try{
		fishcounter = parseInt(fishcounter, 10);
		fishcounter += 1;
	}
	catch{
		fishcounter = 0; 
		fishcounter += 1;
	}
	sessionStorage.setItem("fish", fishcounter);
	console.log(fishcounter);
	updateCounter(fishcounter);
}

function popup() {
  var popup = document.getElementById("instructions");
  popup.classList.toggle("show");
}

// running everything
time();
try {
	sound.resume();
}
catch{
	//pass
}
music();

setInterval(addFish, 1000 * 60 * 30)
setInterval(time, 1000);
setInterval(music, 1000*60*1);

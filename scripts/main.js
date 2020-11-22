var timep = document.getElementById('timeupdate');
console.log(timep)
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
	var sound = new Howl({
		src: ['music/' + timeNew + '.mp3']
	});

	sound.play();
}

time();
try {
	sound.resume();
}
catch{
	//pass
}
music();

setInterval(time, 1000);
setInterval(music, 1000*60*60);
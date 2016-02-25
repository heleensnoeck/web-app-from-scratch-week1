var routes = (function(){

	var self = {};

	var overlay = document.getElementById('weather_overlay');
	var weatherMorning = document.getElementById('weather_morning');
	var button = document.getElementById('button');

	routie({
	    'weather/:cityname': function(cityname) {
	    		overlay.classList.remove('hide');
	    		weatherMorning.classList.add('hide');
	    	
	    	button.onclick = function(){
	    	 	overlay.classList.add('hide');
	    	 	weatherMorning.classList.remove('hide');
	    	}
	    }
	});	

}());



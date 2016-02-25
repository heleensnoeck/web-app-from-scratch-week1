
var setIcon = (function(){

	var self = {};

	self.set = function(data) {
		
		var days = data;
		var morningIcon = document.querySelector('#weather_morning .icon');
		var dayIcon = document.querySelector('#weather_day .icon');
		var eveningIcon = document.querySelector('#weather_evening .icon');
		var nightIcon = document.querySelector('#weather_night .icon');

		function svgIcon(weatherCondition) {

			if ( weatherCondition === "Rain" ) {


				return document.querySelector('#rain').innerHTML;


			} else if ( weatherCondition === "Clear" ) {


				return document.querySelector('#clouds').innerHTML;


			} else if ( weatherCondition === "Sun" ) { 


				return document.querySelector('#sun').innerHTML;


			} else if ( weatherCondition === "Snow" ) { 

				return document.querySelector('#snow').innerHTML;

			}

		}

		morningIcon.innerHTML = svgIcon(days.morning.weather_discription); // pak de innerhtml van het element zie (regeld 191) zet deze gelijk aan wat er uit de functie komt
		dayIcon.innerHTML = svgIcon(days.day.weather_discription);
		eveningIcon.innerHTML = svgIcon(days.evening.weather_discription);
		nightIcon.innerHTML = svgIcon(days.night.weather_discription);

	};
	
}());

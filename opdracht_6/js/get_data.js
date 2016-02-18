
var weatherApp = (function(){

	var self = {};

	self.request = function(url) {
		
		return new Promise(function(resolve, reject) { // Resolve = .then && Reject = .catch;

			var request = new XMLHttpRequest();

			request.onloadstart = function() {

				console.log("Start Loading Data");
				spinner.start();
			};

			request.onloadend = function(response) {

				setTimeout(function(){ 

					console.log("Loaded Data");

					spinner.stop();
					
					var data = request.response;						
					resolve(data);
					
				}, 1000);

			};

			request.onerror = reject;

			request.open('GET', url, true);
			request.send();
		});
	}

	self.getData = function(search) {

		var apiUrl = {
			baseUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Amsterdam&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric',
			chipUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=', 
			id: '&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric'
		};

		// var weatherAppUrl = apiUrl.baseUrl;
		// var weatherAppUrl;
		console.log(search);

		if (search) {
			
			var weatherAppUrl = apiUrl.chipUrl + search + apiUrl.id; 
		
		} else {
			
			var weatherAppUrl = apiUrl.baseUrl;
		
		}


	this.request(weatherAppUrl)
		.then(function(response) {
			console.log("load searched content");
			var jsonData = JSON.parse(response);

				var filteredData = _.map(jsonData, function(value){
					return _.pick(value, 'clouds', 'temp');
				});

				console.log(filteredData);

				var content = {
					  city: jsonData.city.name,     

				      morning: jsonData.list[0].temp.morn,
				      day: jsonData.list[0].temp.day,
				      evening: jsonData.list[0].temp.eve,
				      night: jsonData.list[0].temp.night,
				      
				      weatherDiscription: jsonData.list[0].weather[0].main,
				      
				      wind: jsonData.list[0].speed,
				      humidity: jsonData.list[0].humidity
				};
				console.log(content.city);

				// console.log(content.morning);

				// Transparentie pakt de divs uit de html en plaatst de content erin
				  var placeMorning = {
				  	weather_city: content.city,
				    weather_time:  content.morning + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'N' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity 
				  };

				  var placeDay = {
				    weather_time:  content.day + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'N' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity
				  };

				  var placeEvening = {
				    weather_time:  content.evening + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'E' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity
				  };

				  var placeNight = {
				    weather_time:  content.night + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'E' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity
				  };

			  Transparency.render(document.getElementById('weather_morning'), placeMorning);
			  Transparency.render(document.getElementById('weather_day'), placeDay);
			  Transparency.render(document.getElementById('weather_evening'), placeEvening);
			  Transparency.render(document.getElementById('weather_night'), placeNight);
		});

	}	

	return {
		getData: self.getData,
		request: self.request
		// count: count voegt toe aan app.js global
	}

}());


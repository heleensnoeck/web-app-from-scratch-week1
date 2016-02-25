
(function() {
	'use strict';

	window.scroll(0,40); 

	var launcher = {
		init: function() {
			routes.init();
			weather.getData();
			search.action();
			setIcon.set();
			searchBar.action();
		}
	
	};

	var routes = {
		init: function() {

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
		}
	};

	var weather = {
		request: function(url) {
		
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
		},

		getData: function(search) {
			var self = this; // self zorgt er voor dat hij naar het opper object navigeert 

			var apiUrl = {
				baseUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Amsterdam&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric',
				chipUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=', 
				id: '&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric'
			};

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

						self.filterData(jsonData); // geeft json data mee aan filterdata 107

				});

		},

		filterData: function (data) { // haalt data uit jsonData regel 101
			var weatherData = {
				city: data.city.name,     
			    morning: data.list[0].temp.morn,
		      	day: data.list[0].temp.day,
		      	evening: data.list[0].temp.eve,
		      	night: data.list[0].temp.night,
		      	weatherDiscription: data.list[0].weather[0].main,
		      	wind: data.list[0].speed,
		      	humidity: data.list[0].humidity
			
			};

			sections.render(weatherData); // geeft weatherData mee aan sections.render
		}

	};

	var sections = {

		render: function (data) {
			
			var morning = document.getElementById('weather_morning');
			var day = document.getElementById('weather_day');
			var evening = document.getElementById('weather_evening');
			var night = document.getElementById('weather_night');
			
			var directives = {
				weather_link: {
					href: function (params) { // zorgt er voor dat de content in de sections klikbaar word
						return '#weather/' + this.weather_city;
	
					}
				} 		
			}
			var days = {
				morning: {
					weather_city: data.city,
					weather_time:  data.morning + '° C',
					weather_discription: data.weatherDiscription,
					weather_wind: 'Wind:' + ' ' + 'N' + ' ' + data.wind + ' ' + 'mph',
					weather_humidity: 'Humidity:' + ' ' + data.humidity
				},

				day: {
					weather_time:  data.day + '° C',
					weather_discription: data.weatherDiscription,
					weather_wind: 'Wind:' + ' ' + 'N' + ' ' + data.wind + ' ' + 'mph',
					weather_humidity: 'Humidity:' + ' ' + data.humidity
				},

				evening: {
					weather_time:  data.evening + '° C',
					weather_discription: data.weatherDiscription,
					weather_wind: 'Wind:' + ' ' + 'E' + ' ' + data.wind + ' ' + 'mph',
					weather_humidity: 'Humidity:' + ' ' + data.humidity
				},

				night: {
					weather_time:  data.night + '° C',
					weather_discription: data.weatherDiscription,
					weather_wind: 'Wind:' + ' ' + 'E' + ' ' + data.wind + ' ' + 'mph',
					weather_humidity: 'Humidity:' + ' ' + data.humidity
			  	}

			}

			Transparency.render(morning, days.morning, directives);
			Transparency.render(day, days.day);
			Transparency.render(evening, days.evening);
			Transparency.render(night, days.night);
			
			setIcon.set(days); // geeft de data uit object days mee aan de functie setIcon
		},

		
	}

	var setIcon = {
		set: function(data) {

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

		}
	}

	var searchBar = {
		action: function() {
			// Hammer.js
			var element = document.querySelector('header');
			var mc = new Hammer(document);
			console.log('hoi');

			mc.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 100}))

			// als je vinger naar beneden swiped pak dan het search form en haal de class hide eraf to show the search result
			mc.on('pandown', function() {
				document.getElementById('searchForm').classList.remove('hide');
				console.log('down')
			});

			// als je vinger naar beneden swiped pak dan het search form en haal de class hide eraf to show the search result
			mc.on('panup', function() {
				document.getElementById('searchForm').classList.add('hide');
				console.log('down')
			});
		}
	
	};

	var search = {
		action: function() {

			var submitButton = document.querySelector('#submit');
			
			submitButton.onsubmit = function(ev) {
			
				var searchValue = document.querySelector('#place').value;

				weather.getData(searchValue);

				ev.preventDefault();

			};

		}

	};
 
	var spinner = {
		start: function() {
			// document.getElementById('loading');
			// console.log('start spinner');
			document.getElementById('loading').classList.remove('hide');
		},
		stop: function() {
			document.getElementById('loading').classList.add('hide');
		}
	};
		
	launcher.init();

})();




var weather = (function(){

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

}());


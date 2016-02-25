
var searchField = (function(){

	var self = {};

	self.action = function() {
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

	return {
		action: self.action
		// count: count voegt toe aan app.js global
	}

}());
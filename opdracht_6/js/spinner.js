var spinner = (function(){

	var self = {};

	// function count() {
	// 	console.log('count');
	// } privates

	self.start = function() {
		document.getElementById('loading').classList.remove('hide');
	}

	self.stop = function() {
		document.getElementById('loading').classList.add('hide');
	}

	return {
		start: self.start,
		stop: self.stop,
		// count: count voegt toe aan app.js global
	}

}());


//zie nog best een aantal document.querySelectors / getElementById's > misschien handig om hiervoor een aparte variables module voor aan te maken
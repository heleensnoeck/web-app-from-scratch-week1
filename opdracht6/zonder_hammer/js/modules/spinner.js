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
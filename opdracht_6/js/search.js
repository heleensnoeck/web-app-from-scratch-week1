var search = (function(){

	var self = {};

	self.action = function() {

		var submitButton = document.querySelector('#submit');
		
		submitButton.onsubmit = function(ev) {
		
			var searchValue = document.querySelector('#place').value;

			weatherApp.getData(searchValue);

			ev.preventDefault();

		};

	}

	return {
		action: self.action
	}

}());
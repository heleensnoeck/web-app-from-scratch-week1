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

//zie nog best een aantal document.querySelectors / getElementById's > misschien handig om hiervoor een aparte variables module voor aan te maken
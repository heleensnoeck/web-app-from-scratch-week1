//NOTE: Got the templateing idea from Martijn Nieuwenhuizen en Dylan Vens

(function() {
	'use strict';

	var main = document.querySelector('main');

	var app = {
		init: function() {

			// call the routes.init
			routes.init();

		}
	};

	var routes = {
		init: function() {

			// haschanged event listener
			// als de url veranderd start dan die functie, in de url
			window.addEventListener('hashchange', sections.toggle);
			// also check the page on load voer dan ook een functie uit
			window.addEventListener('load', sections.toggle);

		}
	};

	var sections = {
		toggle: function() {

			// Get the hash of the current url after click
			//  pak de has uit de url en sla op in variable url
			var url = window.location.hash;

			// als er een url is pak dan de 
			if ( url ) {

				// pak uit de html het template dat de url matched 
				var matchingTemplate = document.querySelector(url);

				// als de variable bestaat
				if ( matchingTemplate ) {

					// plaats de de html van die sectie in de main
					main.innerHTML = matchingTemplate.innerHTML;

				} else {

					// If the template doesn't exists: load the error template
					main.innerHTML = document.querySelector('#error').innerHTML;

				}

			} else {
				
				// If the url has no hash(so this is home) -> set the hash to start
				window.location.hash = '#home';

			} 

		}
	};

	// start the main app
	app.init();

})();
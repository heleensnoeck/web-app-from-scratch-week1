
(function() {
	'use strict';

	window.scroll(0,40);

	// function Scrolldown() {
	//      window.scroll(y,40); 
	// }

	// window.onload = Scrolldown;
  
	var app = {
		init: function() {
			// call the routes.init
			// routes.init();
			weatherApp.getData();
			search.action();
			// searchField.action();

		}
	};
		
	app.init();

})();




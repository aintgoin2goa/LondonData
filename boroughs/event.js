var evnt = (function(){


	function publish(ev, args){
		$(document.body).trigger(ev, args);
	}

	function subscribe(ev, fn){
		$(document.body).on(ev, fn);
	}

	return Object.create(null, {
		"publish" : {
			value : publish
		},
		"subscribe" : {
			value : subscribe
		}
	});

}());
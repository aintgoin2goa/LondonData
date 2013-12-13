// this file needs to go at the end of the <body>
var key = (function(){

	var $key = $('#key');
	var eventsAdded = false;

	function addItemToKey(object){
		var $li, $color, $text;
		$li = $('<li />').attr("data-title",object.data.title);
		$text = $('<span class="text" />').text(object.data.title);
		$color = $('<span class="color" />').css('backgroundColor', object.data.color.web);
		$li.append($text);
		$li.append($color);
		$key.append($li);
	}

	function writeKey(objects){
		$key.empty();
		_.each(objects, function(object){
			addItemToKey(object);
		});
		addEvents();
	}

	function addEvents(){
		if(eventsAdded){
			return;
		}

		$key.on('mouseover', 'li', function(){
			evnt.publish('highlight', $(this).data("title") );
		})
		.on('mouseout', 'li', function(){
			evnt.publish('unhighlight', $(this).data("title") );
		})
		.on('click', 'li', function(){
			clearHighlight();
			$(this).find("span.text").addClass("active");
			evnt.publish('goto', $(this).data("title"));
		});

		eventsAdded = true;
	}

	function clearHighlight(){
		$key.find("li span.text.active").removeClass("active");
	}

	return Object.create(null, {
		"write" : {
			value : writeKey
		},
		"clearHighlight" : {
			value : clearHighlight
		}
	});

}());
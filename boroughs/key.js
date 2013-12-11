// this file needs to go at the end of the <body>
var key = (function(){

	var $key = $('#key');

	function addItemToKey(data){
		var $li, $color, $text;
		$li = $('<li />').attr("data-title", data.title);
		$text = $('<span class="text" />').text(title);
		$color = $('<span class="color" />').css('backgroundColor', data.color.web);
		$li.append($text);
		$li.append($color);
		$key.append($li);
	}

	function writeKey(objects){
		$key.empty();
		objects.forEach(function(object){
			addItemToKey(object._data);
		});
	}

	return Object.create(null, {
		"write" : {
			value : writeKey
		}
	});

}());
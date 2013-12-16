var info = (function(){

	var $el = $("#info");
	var $table = $el.children('table');
	var $tbody, $thead;


	function buildHead(d){
		var columns = Object.keys(d[0]).map(data.getHumanName);
		$thead = $('<thead />');
		var $tr = $('<tr />');
		columns.forEach(function(col){
			$tr.append('<th>' + col + '</th>');
		});
		$thead.append($tr);
		$table.append($thead);
	}

	function buildBody(data, titleColumn){
		$tbody = $('<tbody />');
		var $tr;
		data.forEach(function(d){
			$tr = $('<tr />').data('title', d[titleColumn]);
			var cols = Object.keys(d);
			for(var i=0, l=cols.length; i<l; i++){
				var value = d[cols[i]];
				if(typeof value == "number"){
					value = Math.round(value*Math.pow(10,2))/Math.pow(10,2);;
				}
				$tr.append('<td class="' + cols[i] + '">' + value + '</td>');
			}
			$tbody.append($tr);
		});
		$table.append($tbody);
	}

	function buildTable(data, titleColumn){
		buildHead(data);
		buildBody(data, titleColumn);
	}

	function filter(name){
		$tbody.find('tr').hide();
		$tbody.find('tr[data-title="' + name +'"]').show();
	}

	function clearFilter(){
		$tbody.find('tr').show();
	}

	function showInfo(){
		$el.addClass("visible");
	}

	function hideInfo(){
		$el.removeClass("visible");
	}

	return Object.create(null, {
		"init" : {
			value : buildTable
		},
		"filter" : {
			value : filter
		},
		"clearFilter" : {
			value : clearFilter
		},
		"show" : {
			value : showInfo
		},
		"hide" : {
			value : hideInfo
		}
	})

}());
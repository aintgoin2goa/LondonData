var data = (function(){

	var data;
	var keys = [];
	var pointer = 0;
	var columns = [];
	var axis = {};

	function load(url, callback){
		return $.getJSON(url, function(d){
			data = d;
			callback();
		});
	}

	function find(property, value){
		return _.find(data, function(obj, key){
			return obj[property] === value;
		});
	}

	var index = function index(property){
		index =[];
		columns = [];
		axis = {};
		pointer = 0;
		keys = _.pluck(data, property);
		columns = Object.keys(data[0]);
		columns.forEach(function(c){
			if(typeof(data[0][c]) !== "number" && data[0][c] !== null){
				return;
			}
			var d = _.pluck(data, c);
			var min = Infinity;
			var max = 0;
			min = _.reduce(d, function(m, v){
				return v !== null && v < m ? v : m;
			}, min);
			max = _.reduce(d, function(m, v){
				return v !== null & v > m ? v : m;
			}, max);
			if(min === Infinity){
				min = 0;
			}
			if(max === 0){
				max = Infinity;
			}
			axis[c] = {min : min, max : max, variance : max - min};
		});
	}

	function next(){
		if(pointer === keys.length){
			return false;
		}
		var d = data[pointer];
		pointer++;
		return d;
	}

	function plotOnAxis(property, value){
		var diffFromMin = value - axis[property].min;
		return diffFromMin / axis[property].variance;
	}

	function sample(from, number){
		data = data.slice(from, number);
	}

	function getHumanName(property){
		property = property.replace(/[A-Z]/g, function(match){
			return " " + match;
 		});
		property = property.replace(/^[a-z]/, function(match){
			return match.toUpperCase();
		});
		return property;
	}

	return Object.create(null, {
		"load" : {
			value : load
		},
		"raw" : {
			get : function(){
				return data
			}
		},
		"find" : {
			value : find
		},
		"next" : {
			value : next
		},
		"pointer" : {
			get : function(){
				return pointer;
			},
			set : function(p){
				pointer = p;
			}
		},
		"columns" : {
			get : function(){
				return columns;
			}
		},
		"plotOnAxis" : {
			value : plotOnAxis
		},
		"index" : {
			value : index
		},
		"axis" : {
			get : function(){
				return axis;
			}
		},
		"keys" : {
			get : function(){
				return keys;
			}
		},
		"sample" : {
			value : sample
		},
		"getHumanName" : {
			value : getHumanName
		}
	});


}());
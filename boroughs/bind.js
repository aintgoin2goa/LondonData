var bind = (function(){

	var binding = {
		property : "",
		useKey : false,
		dummy : null,
		transform : function(value){
			return value;
		}
	}

	var bindings = {
		title : Object.create(binding),
		x : Object.create(binding),
		y : Object.create(binding),
		z : Object.create(binding),
		radius : Object.create(binding),
		color : Object.create(binding)
	}

	var createBinding = function(binding){
		var obj = {
			to : function(property){
				bindings[binding].property = property;
				return {
					using : function(transform){
						bindings[binding].transform = transform;
					}
				}
			}
		}
		obj.to.key = function(){
			bindings[binding].useKey = true;
		}
		obj.to.dummy = function(val){
			bindings[binding].dummy = val;
		}
		return obj;
	}

	return Object.create(null, {
		"x" : {
			value : createBinding("x")
		},
		"y" : {
			value : createBinding("y")
		},
		"z" : {
			value : createBinding("z")
		},
		"radius" : {
			value : createBinding("radius")
		},
		"title" : {
			value : createBinding("title")
		},
		"color" : {
			value : createBinding("color")
		},
		"bindings" : {
			get : function(){
				return bindings;
			}
		}
	});

}());
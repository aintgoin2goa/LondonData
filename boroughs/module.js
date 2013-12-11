function module(module){
	var regexp = /function\s*(.+?)\s*\(([A-Za-z0-9_$, ]+)\)/;
	var matches = module.toString().match();
	var name = matches[1];
	var dependencies = matches[2].split(",").map(function(value){
		return value.trim();
	});
	window.modules = window.modules || {};
	window.modules[name] = {
		dependencies : dependencies,
		factory : module,
		module : null
	}

	dependencies.forEach(function(dependancy){
		
	});

}
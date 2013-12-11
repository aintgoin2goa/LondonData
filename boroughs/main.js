var timer = {
	startTime : 0,
	previous : 0,
	times : [],
	start : function(){
		timer.previous = Date.now();
		timer.startTime = timer.previous; 
	},
	capture : function(name){
		var now = Date.now();
		var captured = {name: name, time : now - timer.previous, total : now - timer.startTime};
		timer.times.push(captured);
		//console.log(JSON.stringify(captured));
		timer.previous = now;
	},
	log: function(){
		console.group("times");
		timer.times.forEach(function(time){
			console.log(time.name, time.time, time.total)
		});
		console.groupEnd();
	}
}

timer.start();

var random = function(){
	return _.random(-2000, 2000)
}

var spheres = {};
var d;

var globalGeometry = new THREE.Geometry();

//load data
data.load("data/data.json", function(){
	timer.capture("data loaded");
	//data.sample(0, 25);
	data.index("name");
	// setup bindings
	bind.title.to('name');
	bind.x.to.dummy(random);
	bind.y.to.dummy(random);
	bind.z.to.dummy(random);
	bind.radius.to('population').using(function(pop){
		return Math.round(pop);
	});
	bind.color.to('lifeExpectancyAv').using(function(value){
		if(value == null){
			return color.calculate(120, 120, 120);
		}
		var amount = data.plotOnAxis("lifeExpectancyAv", value);
		var inverted = 1 - amount;
		return color.calculate(inverted * 255, amount * 255, 0);
	});
	timer.capture("bindings created");

	// create spheres
	var bindings = bind.bindings;
	while(d = data.next(), d !== false){
		var s = sphere.create(d, bindings);
		spheres[d.name] = s;
		THREE.GeometryUtils.merge(globalGeometry, s);
	}
	timer.capture("spheres created");
	console.log("created spheres", spheres);
	timer.log();
	alert("Done");
	// merge geometry?

	//setup scene

	//render

	//write key

});


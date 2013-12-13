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
		console.groupCollapsed("times");
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
var group;

//load data
data.load("data/data.json", function(){
	timer.capture("data loaded");
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
		return color.calculate(Math.round(inverted * 255), Math.round(amount * 255), 0);
	});
	timer.capture("bindings created");

	// create spheres
	var bindings = bind.bindings;
	var s;
	while(d = data.next(), d !== false){
		s = sphere.create(d, bindings);
		spheres[d.name] = Object.create({position : s.position, data : s._data, object : s});
		scene.add(s);
	}
	timer.capture("spheres created");

	//setup scene
	scene.setup(document.body, camera, light);
	
	
	timer.capture("scene created");
	scene.render();
	timer.capture("scene rendered");
	timer.log();

	key.write(spheres);
	setTimeout(function(){
		tween.camera.toStart();
	}, 5);
});

evnt.subscribe("highlight", function(event, title){
	var sph = spheres[title];
	sphere.addGlow(sph.object);
});

evnt.subscribe("unhighlight", function(event, title){
	sphere.removeGlow();
});

evnt.subscribe("goto", function(event, title){
	scene.zoomed = true;
	var sph = spheres[title];
	tween.camera.toObject(sph.object);
});

$('#back').on("click", function(){
	scene.zoomed = false;
	key.clearHighlight();
	tween.camera.toStart();
});


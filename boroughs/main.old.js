
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;
var boroughs = {};
var highestLifeExp = 0, 
	lowestLifeExp = 200,
	lifeExpancyAxis = 0;

var zoomed = false;
var limits ={
	x : [-2000, 2000],
	y : [-2000, 2000],
	z : [-2000, 2000]
}

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
		timer.times.push({name: name, time : now - timer.previous, total : now - timer.startTime});
		timer.previous = now;
	}

}

function toHexWithPadding(number){
	var str = number.toString(16);
	if(str.length === 1){
		str = "0" + str;
	}
	return str;
}

function calculateColor(lifeExp){
	var r, g, b;
	if(lifeExp == null){
		r = g = b = 120;
	}else{
		b = 0;
		g = (lifeExp - lowestLifeExp) / lifeExpancyAxis;
		r = 1 - g;
		g = Math.round(g * 255);
		r = Math.round(r * 255);
	}
	
	var web = "rgb({R},{G},{B})"
				.replace("{R}", r)
				.replace("{G}", g)
				.replace("{B}", b);


	var three = parseInt((toHexWithPadding(r) + toHexWithPadding(g) + toHexWithPadding(b)), 16);

	return {
		three : three, 
		web : web
	};
}

function addBorough(name, data){
	var color  = calculateColor(data.lifeExpectancyAv);
	var radius = Math.round(data.population);
	var segments = radius/2 > 24 ? radius/2 : 24;
	var sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
	var sphereMaterial = new THREE.MeshLambertMaterial({ color: color.three,  opacity: 0.9, transparent: true });
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.set(
		_.random(limits.x[0], limits.x[1]), 
		_.random(limits.y[0], limits.y[1]), 
		_.random(limits.z[0], limits.z[1])
	);
	boroughs[data.name] = {name: data.name, data:data, color:color, object:sphere};
	scene.add(sphere);
}

function writeKey(){
	var $li, $color, $text;
	var $key = $('#key');
	$key.empty();
	for(var borough in boroughs){
		$li = $('<li />').attr("data-borough", borough);
		$text = $('<span class="text" />').text(borough);
		$color = $('<span class="color" />').css('backgroundColor', boroughs[borough].color.web);
		$li.append($text);
		$li.append($color);
		$key.append($li);
	}
}




var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

scene.add(camera);
/*
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
*/

var light = new THREE.SpotLight(0xffffff, 1.5);
light.position.set(camera.position.x,camera.position.y, 6000);
 
scene.add(light);

var glowMaterial = function(){
	return new THREE.ShaderMaterial( 
	{
	    uniforms: 
		{ 
			"c":   { type: "f", value: 0 },
			"p":   { type: "f", value: 4.5 },
			glowColor: { type: "c", value: new THREE.Color(0xffffff) },
			viewVector: { type: "v3", value: camera.position }
		},
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.FrontSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	});
}


//var tween = getTweens(camera);

function cameraIsAtStartingPosition(){
	var current = camera.position;
	var starting = tween.camera.startingPosition;
	return (current.x === starting.x && current.y === starting.y && current.z === starting.z);
}

var glowMesh;

function addGlow(obj){
	glowMesh = new THREE.Mesh(obj.geometry.clone(), glowMaterial().clone());
	glowMesh.position = obj.position;
	glowMesh.scale.multiplyScalar(1.5);
	scene.add(glowMesh);
	render();
}

function removeGlow(){
	scene.remove(glowMesh);
	glowMesh = null;
	render();
}


$.getJSON("data/data.json", function(data){
	timer.capture("received data");
	
	var boroughsToShow = Object.keys(data);
	/*
	_.each(data, function(value, key){
		if(boroughsToShow.indexOf(key) == -1){
			delete data[key];
		}
	});
	*/
	console.log("data", data);
	var lifeExpectancies = _.pluck(data, "lifeExpectancyAv");

	lowestLifeExp = _.reduce(lifeExpectancies, function(m, d){
		return d && d < m ? d : m;
	}, lowestLifeExp);
	highestLifeExp = _.reduce(lifeExpectancies, function(m, d){
		return d && d > m ? d : m;
	}, highestLifeExp);
	lifeExpancyAxis = (highestLifeExp - lowestLifeExp);
	timer.capture("begin adding boroughs");
	boroughsToShow.forEach(function(b){
		addBorough(b, data[b]);
	});

	timer.capture("All boroughs added");
	writeKey();
	timer.capture("Key written");
	render();
	timer.capture("initial render");
	setTimeout(function(){
		$(renderer.domElement).css('visibility', 'visible');
		console.group("TIMER");
		console.dir(timer.times);
		console.groupEnd();
	}, 5);
	camera.lookAt({x:0,y:0,z:0});
	//tween.camera.toStart();
	$('#key').on('mouseover', 'span.text', function(){
		if(zoomed){
			return;
		}
		var name = $(this).text();
		var borough = boroughs[name];
		addGlow(borough.object);
	});
	$('#key').on('mouseout', 'span.text', function(){
		if(zoomed){
			return;
		}
		removeGlow();
	});
	$('#key').on('click', 'span.text', function(){
		$('#key span.text.active').removeClass("active");
		$(this).addClass("active");
		var name = $(this).text();
		var borough = boroughs[name];
		//tween.camera.toObject(borough.object);
		$('#info-container .name').text(name);
		$('#info-container .population').text(Math.round(borough.data.population * 1000));
		$('#info-container .lifeExpec-m').text(Math.round(borough.data.lifeExpectancy.m) || "?");
		$('#info-container .lifeExpec-f').text(Math.round(borough.data.lifeExpectancy.f) || "?");
		setTimeout(function(){
			$('#info-container').addClass('visible');
		}, 1000);
		
		removeGlow();
		zoomed = true;
	});
	$(document.body).on('click', '#back', function(){
		$('#key span.text.active').removeClass("active");
		//tween.camera.toStart();
		$('#info-container').removeClass('visible');
		zoomed = false;
	});
	$(document.body).on("mousedown", startDrag);
	$(document.body).on("mouseup", stopDrag);

});

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 6000);

function render(tweening) {
	renderer.render(scene, camera);
	if(!tweening){
		controls.update();
	}
}

function startDrag(){
	$(document.body).on("mousemove", render);
}

function stopDrag(){
	$(document.body).off("mousemove", render);
}

$(window).on("unload", function(){
	$(renderer.domElement).remove();
});

THREEx.WindowResize(renderer, camera);

timer.start();




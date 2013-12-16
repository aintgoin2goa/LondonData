var axisLinks = (function(){

	$container = $('#axis-links');
	$x = $container.find('a.x');
	$y = $container.find('a.y');
	$z = $container.find('a.z');

	var lineMaterial =  new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth : 5
    });

    var XaxisLink, YaxisLine, ZaxisLine;

	var viewPoints ={
		x : {
			position : {x:0,y:0,z:6000},
			rotation : {x:0,y:90, z:0}
		},
		y : {
			position : {x:0,y:0,z:6000},
			rotation : {x:0,y:0,z:0}
		},
		z : {
			position : {x:0,y:0,z:0},
			rotation : {x:90,y:0,z:0}
		}
	}

	function showXAxis(){
		  var geometry = new THREE.Geometry();
		  geometry.vertices.push(new THREE.Vector3(-4000, 0, 0));
		  geometry.vertices.push(new THREE.Vector3(4000, 0, 0));
		  XaxisLine = new THREE.Line(geometry, lineMaterial);
		  scene.add(XaxisLine);
	}

	function showYAxis(){
		  var geometry = new THREE.Geometry();
		  geometry.vertices.push(new THREE.Vector3(0, -4000, 0));
		  geometry.vertices.push(new THREE.Vector3(0, 4000, 0));
		  YaxisLine = new THREE.Line(geometry, lineMaterial);
		  scene.add(YaxisLine);
	}

	function showZAxis(){
		  var geometry = new THREE.Geometry();
		  geometry.vertices.push(new THREE.Vector3(0, 0, -6000));
		  geometry.vertices.push(new THREE.Vector3(0, 0, 6000));
		  ZaxisLine = new THREE.Line(geometry, lineMaterial);
		  scene.add(ZaxisLine);
	}

	function hideAxisLines(){
		if(XaxisLine !== null){
			scene.remove(XaxisLine);
			XaxisLine = null;
		}
		if(YaxisLine !== null){
			scene.remove(YaxisLine);
			YaxisLine = null;
		}
		if(ZaxisLine !== null){
			scene.remove(ZaxisLine);
			ZaxisLine = null;
		}
	}


	function setLinks(){
		var bindings = bind.bindings;
		$x.children('span').text(data.getHumanName(bindings.x.property));
		$y.children('span').text(data.getHumanName(bindings.y.property));
		$z.children('span').text(data.getHumanName(bindings.z.property));
		addEvents();
	}

	function addEvents(){
		$container.on('click', 'a.data', function(){
			info.show();
		});
		$container.on('mouseover', function(e){
			switch(e.target.className){
				case "x" : 
					//showXAxis();
					break;
			}
		});
		$container.on('mouseout', 'a', function(){
			//hideAxisLines();
		})
	}

	showXAxis();
	showYAxis();
	showZAxis();

	return Object.create(null, {
		"init" : {
			value : setLinks
		}
	});

}());
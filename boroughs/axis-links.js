var axisLinks = (function(){

	$container = $('#axis-links');
	$x = $container.find('a.x');
	$y = $container.find('a.y');
	$z = $container.find('a.z');

	var lineMaterial =  new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth : 5
    });

    var axisLines = {
    	x :null,
    	y : null,
    	z : null
    }

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
		  axisLines.x = new THREE.Line(geometry, lineMaterial);
		  scene.add(axisLines.x);
		  scene.render();
	}

	function showYAxis(){
		  var geometry = new THREE.Geometry();
		  geometry.vertices.push(new THREE.Vector3(0, -4000, 0));
		  geometry.vertices.push(new THREE.Vector3(0, 4000, 0));
		  axisLines.y = new THREE.Line(geometry, lineMaterial);
		  scene.add(axisLines.y);
		  scene.render();
	}

	function showZAxis(){
		  var geometry = new THREE.Geometry();
		  geometry.vertices.push(new THREE.Vector3(0, 0, -6000));
		  geometry.vertices.push(new THREE.Vector3(0, 0, 6000));
		  axisLines.z = new THREE.Line(geometry, lineMaterial);
		  scene.add(axisLines.z);
		  scene.render();
	}

	function hideAxisLine(axis){
		if(axisLines[axis] !== null){
			scene.remove(axisLines[axis]);
			axisLines[axis] = null;
		}
		scene.render();
	}


	function setLinks(){
		var bindings = bind.bindings;
		$x.text(data.getHumanName(bindings.x.property));
		$y.text(data.getHumanName(bindings.y.property));
		$z.text(data.getHumanName(bindings.z.property));
		addEvents();
	}

	function addEvents(){
		$container.on('click', 'a.data', function(){
			info.clearFilter();
			info.show();
		});
		$container.on('mouseover', function(e){
			switch(e.target.className){
				case "x" : 
					showXAxis();
					break;
				case "y" : 
					showYAxis();
					break;
				case "z" : 
					showZAxis();
					break;
			}
		});
		$container.on('mouseout', 'a', function(){
			if($(this).hasClass("active") || $(this).hasClass("data")){
				return;
			}else{
				hideAxisLine($(this).data('axis'));
			}

		})
	}


	return Object.create(null, {
		"init" : {
			value : setLinks
		}
	});

}());
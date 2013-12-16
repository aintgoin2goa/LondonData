var axisLinks = (function(){

	$container = $('#axis-links');
	$x = $container.find('a[data-axis="x"]');
	$y = $container.find('a[data-axis="y"]');
	$z = $container.find('a[data-axis="z"]');

	// create line objects


	var lineMaterial =  new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth : 2
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

 	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-4000, 0, 0));
	geometry.vertices.push(new THREE.Vector3(4000, 0, 0));
	axisLines.x = new THREE.Line(geometry, lineMaterial.clone());
	axisLines.x.visible = false;
	axisLines.x.material.color.setHex(0xff0000);
	scene.add(axisLines.x);

	geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, -3000, 0));
	geometry.vertices.push(new THREE.Vector3(0, 3000, 0));
	axisLines.y = new THREE.Line(geometry, lineMaterial.clone());
	axisLines.y.visible = false;
	axisLines.y.material.color.setHex(0x00ff00);
	scene.add(axisLines.y);

	geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, 0, -4000));
	geometry.vertices.push(new THREE.Vector3(0, 0, 4000));
	axisLines.z = new THREE.Line(geometry, lineMaterial.clone());
	axisLines.z.visible = false;
	axisLines.z.material.color.setHex(0x0000ff);
	scene.add(axisLines.z);

	function showAxisLine(axis){
		axisLines[axis].visible = true;
		scene.render();
	}

	function hideAxisLine(axis){
		axisLines[axis].visible = false;
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
		$container.on('click', 'a', function(){
			var $this = $(this);
			if($this.hasClass("data")){
				info.clearFilter();
				info.show();	
			}else if( $this.hasClass("axis") ){
				$this.toggleClass('active');
				var axis = $this.data("axis");
				if($this.hasClass('active')){
					showAxisLine(axis);
				}else{
					hideAxisLine(axis);
				}
			}
		});

		$container.on('mouseover', function(e){
			showAxisLine($(e.target).data('axis'));
		});

		$container.on('mouseout', 'a', function(){
			if($(this).hasClass("active") || $(this).hasClass("data")){
				return;
			}else{
				hideAxisLine($(this).data('axis'));
			}
		});
	}

	return Object.create(null, {
		"init" : {
			value : setLinks
		}
	});

}());
var camera = (function(){

	var camera = new THREE.PerspectiveCamera(45, scene.width / scene.height, 0.1, 10000);
	camera.position.set(0,0,0);
	
	var startingPosition = {
		x : 0,
		y : 0,
		z : 8000
	};

	var startingTarget = {
		x : 0,
		y : 0,
		z : 0
	}

	var currentTarget = Object.create(startingTarget);

	function lookAt(target){
		currentTarget = target;
		camera.lookAt(target);
	}

	function rotate(x, y, z){
		camera.rotation.x = x;
		camera.rotation.y = y;
		camera.rotation.z = z;
	}

	function toRadians(obj){
		return {
			x : obj.x * Math.PI / 180,
			y : obj.y * Math.PI / 180,
			z : obj.z * Math.PI / 180
		}
	}

	return Object.create(null, {
		"object" : {
			get : function(){
				return camera;
			}
		},
		"target" : {
			get : function(){
				return currentTarget;
			},
			set : function(t){
				currentTarget = t;
				camera.lookAt(t);
			}
		},
		"position" : {
			get : function(){
				return _.clone(camera.position)
			},
			set : function(p){
				camera.position.set(p.x, p.y, p.z)
			}
		},
		"starting" : {
			get : function(){
				return {position : _.clone(startingPosition), target : _.clone(startingTarget)};
			}
		},
		"rotation" : {
			set : function(val){
				rotate(toRadians(val));
			},
			get : function(){
				return camera.rotation;
			}
		}
	});

}());
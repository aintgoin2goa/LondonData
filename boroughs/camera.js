var camera = (function(){

	var camera = new THREE.PerspectiveCamera(45, scene.width / scene.height, 0.1, 10000);

	var startingPosition = {
		x : 0,
		y : 160,
		z : 6000
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
		"initial" : {
			get : function(){
				return {position : _.clone(startingPosition), target : _.clone(startingTarget)};
			}
		}
	});

}());
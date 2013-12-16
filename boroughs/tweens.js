var tween = (function(){

	var active = false;

	var easingTypes = {
		"in" : TWEEN.Easing.Quadratic.In,
		"out" : TWEEN.Easing.Quadratic.Out,
		"inout" : TWEEN.Easing.Quadratic.InOut
	}

	function updateCamera(){
		camera.position = {
			x : Math.round(this.x),
			y : Math.round(this.y), 
			z : Math.round(this.z)
		};
		camera.target = {
			x : Math.round(this._x), 
			y : Math.round(this._y), 
			z : Math.round(this._z)
		};
	}

	function loop(){
		TWEEN.update();
		scene.render();
		if(active){
			requestAnimationFrame(loop);
		}
	}

	function start(){
		active = true;
		requestAnimationFrame(loop);
	}

	function getCoords(position, target, zAdjustment){
		return {
			x : position.x,
			y : position.y,
			z : position.z + (zAdjustment || 0),
			_x : target.x,
			_y : target.y,
			_z : target.z
		};
	}

	function tween(from, to, easing, onUpdate, onComplete){
		return new TWEEN.Tween(from).to(to)
			.easing(easing)
			.onUpdate(onUpdate)
			.onComplete(function(){
				active = false;
				console.groupEnd();
				if(typeof onComplete == "function"){
					onComplete();
				}
			});
	}

	function tweenCameraToStart(){
		var starting = camera.starting;
		var from  = getCoords(camera.position, camera.target);
		var to = getCoords(starting.position, starting.target) ;
		tween(from, to, easingTypes.out, updateCamera).start();
		start();
	}

	function tweenCameraToObject(object){
		var target = {
			x : object.position.x, 
			y : object.position.y, 
			z : object.position.z
		};

		var from  = getCoords(camera.position, camera.target);
		var to =  getCoords(object.position, target, object.geometry.radius * 3);

		tween(from, to, easingTypes.inout, updateCamera, function(){
			camera.target = object.position;
		}).start();
		start();
	}

	var cameraTweens = Object.create(null, {
		"toStart" : {
			value : tweenCameraToStart
		},
		"toObject" : {
			value : tweenCameraToObject
		}
	});

	return Object.create(null, {
		"camera" : {
			value : cameraTweens
		},
		"active" : {
			get : function(){
				return active;
			}
		}
	});

}());


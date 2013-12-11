var tween = (function(){

	var active = false;

	var easingTypes = {
		"in" : TWEEN.Easing.Quadratic.In,
		"out" : TWEEN.Easing.Quadratic.Out,
		"inout" : TWEEN.Easing.Quadratic.InOut
	}

	function updateCamera(){
		camera.position = {x:this.x, y:this.y, z:this.z};
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

	function tween(from, to, easing, onUpdate, onComplete){
		return new TWEEN.Tween(from).to(to)
			.easing(easing)
			.onUpdate(onUpdate)
			.onComplete(function(){
				tweening = false;
				onComplete();
			});
	}

	function tweenCameraToStart(){
		var from  = camera.position;
		var to = camera.initial.position;
		tween(from, to, easingTypes.out, updateCamera, function(){
			camera.lookAt(to);
		}).start();
		start();
	}

	function tweenCameraToObject(object){
		var from  = camera.position;
		var to = object.position;
		tween(from, to, easingTypes.inout, updateCamera, function(){
			camera.lookAt(to);
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
		"camera" : cameraTweens
	});

}());


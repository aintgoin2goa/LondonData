var scene = (function(){

	var width = window.innerWidth;
	var height = window.innerHeight;
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	var scene = new THREE.Scene();
	var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
	var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	scene.add(skybox);
	var controls, camera, element;

	function startDrag(){
		$(element).on("mousemove", render);
	}

	function stopDrag(){
		$(element).off("mousemove", render);
	}

	function setup(el, cam, light, options){
		element = el;
		camera = cam.object;
		scene.add(camera);
		scene.add(light.object);
		options = options || {};
		options = _.defaults(options, {
			autopan : true,
			autoresize : true
		});
		element.appendChild(renderer.domElement);
		if(options.autopan){
			controls = new THREE.OrbitControls(camera, renderer.domElement);
			$(element).on("mousedown", startDrag);
			$(element).on("mouseup", stopDrag);
		}
		
		if(options.autoresize){
			THREEx.WindowResize(renderer, camera);
		}
	
	}

	function render(){
		renderer.render(scene, camera);
		if(!tween.active && controls){
			controls.update();
		}
	}

	return Object.create(null, {
		"object" : {
			get : function(){
				return scene;
			}
		},
		"add" : {
			value : function(obj){
				scene.add(obj);
			}
		},
		"remove" : {
			value : function(obj){
				scene.remove(obj);
			}
		},
		"render" : {
			value : function(){
				render();
			}
		},
		"renderer" : {
			get : function(){
				return renderer;
			}
		},
		"width" : {
			get : function(){
				return width;
			}
		},
		"height" : {
			get : function(){
				return height;
			}
		}
	});
}());
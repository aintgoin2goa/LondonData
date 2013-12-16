var scene = (function(){

	var width = window.innerWidth;
	var height = window.innerHeight;
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	var scene = new THREE.Scene();
	var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
	var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	scene.add(skybox);
	var controls, camera, element;
	var zoomed = false;

	function startDrag(){
		if(!zoomed){
			$(element).on("mousemove", render);
		}
	}

	function stopDrag(){
		$(element).off("mousemove", render);
	}

	function setup(el, cam, light, options){
		element = el;
		camera = cam;
		scene.add(camera.object);
		light.objects.forEach(function(l){
			scene.add(l);
		})
		options = options || {};
		options = _.defaults(options, {
			autopan : true,
			autoresize : true
		});
		element.appendChild(renderer.domElement);
		if(options.autopan){
			controls = new THREE.OrbitControls(camera.object, renderer.domElement);
			$(element).on("mousedown", startDrag);
			$(element).on("mouseup", stopDrag);
		}
		
		if(options.autoresize){
			THREEx.WindowResize(renderer, camera.object);
		}
	
	}

	function render(){
		renderer.render(scene, camera.object);
		if(!tween.active && !zoomed && controls){
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
			value : render
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
		},
		"setup" : {
			value : setup
		},
		"zoomed" : {
			get : function(){
				return zoomed;
			},
			set : function(value){
				zoomed = value;
			}
		}
	});
}());
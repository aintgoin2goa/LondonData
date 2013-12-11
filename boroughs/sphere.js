  var sphere = (function(){

  	var glowMesh;

  	function getBoundData(data, binding){
      if(binding.dummy != null){
        return binding.dummy();
      }
  		return binding.transform(data[binding.property]);
  	}



  	function create(data, bindings){
  		var _getBoundData = function(binding){
  			return getBoundData(data, binding);
  		}
  		var x = _getBoundData(bindings.x);
  		var y = _getBoundData(bindings.y); 
  		var z = _getBoundData(bindings.z);
  		var radius = _getBoundData(bindings.radius);
  		var color = _getBoundData(bindings.color);
      var title = _getBoundData(bindings.title);
  		var segments = radius/4 > 12 ? radius/2 : 12;
  		var sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
  		var sphereMaterial = new THREE.MeshLambertMaterial({ color: color.three,  opacity: 0.9, transparent: true });
  		var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  		sphere.position.set(x, y, z);
      sphere._data = {title : title, color : color};
      timer.capture("Sphere created for " + title + " (" + data.population + ")");
  		return sphere;
  	}

  	function addGlow(sphere){
  		glowMesh = new THREE.Mesh(sphere.geometry.clone(), shaders.glow.clone());
  		glowMesh.position = sphere.position;
  		glowMesh.scale.multiplyScalar(1.5);
  		scene.add(glowMesh);
  		scene.render();
  	}

  	function removeGlow(){
  		scene.remove(glowMesh);
  		glowMesh = null;
  		scene.render();
  	}

  	return Object.create(null, {
  		"create" : {
    			value : create
    		},
        "addGlow" : {
          value : addGlow
        },
        "remove" : {
          value : removeGlow
        }
  	});

  }());

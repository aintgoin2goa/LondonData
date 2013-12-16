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
  		var segments = Math.round(radius/4);
      segments = segments < 12 ? 12 : segments;
  		var sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
  		var sphereMaterial = new THREE.MeshLambertMaterial({ color: color.three,  opacity: 0.9, transparent: true });
  		var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  		sphere.position.set(x, y, z);
      sphere._data = {title : title, color : color};
      timer.capture("Sphere created for " + title + " (" + data.population + ")");
  		return sphere;
  	}

  	function addGlow(sphere){
      if(scene.zoomed){
        return;
      }
      sphere.material._color = sphere.material.color.getHex();
  		sphere.material.color.setHex(0xffffff);
  		scene.render();
  	}

  	function removeGlow(sphere){
  		sphere.material.color.setHex(sphere.material._color);
  		scene.render();
  	}

  	return Object.create(null, {
  		"create" : {
    			value : create
    		},
        "addGlow" : {
          value : addGlow
        },
        "removeGlow" : {
          value : removeGlow
        }
  	});

  }());

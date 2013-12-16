var light = (function(){

	var light1 = new THREE.PointLight(0xffffff, 1);
	light1.position.set(-2000,2000, 6000);

	var light2 = new THREE.PointLight(0xffffff, 1);
	light2.position.set(2000,2000, -6000);

	return Object.create(null, {
		"objects" : {
			get : function(){
				return [light1, light2];
			}
		},
		"position" : {
			get : function(){
				return light.position;
			},
			set : function(p){
				light.position.set(p.x, p.y, p.z);
			}
		}
	});

}());
var light = (function(){

	var light = new THREE.HemisphereLight(0xffffff, 1.5);
	light.position.set(0,0, 6000);

	return Object.create(null, {
		"object" : {
			get : function(){
				return light;
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
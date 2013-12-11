var shaders = (function(){

	var glowMaterial;

	var createGlowMaterial = function(){
		return new THREE.ShaderMaterial( 
		{
		    uniforms: 
			{ 
				"c":   { type: "f", value: 0 },
				"p":   { type: "f", value: 4.5 },
				glowColor: { type: "c", value: new THREE.Color(0xffffff) },
				viewVector: { type: "v3", value: camera.position }
			},
			vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			side: THREE.FrontSide,
			blending: THREE.AdditiveBlending,
			transparent: true
		});
	}

	return Object.create(null, {
		"glow" : {
			get : function(){
				if(!glowMaterial){
					glowMaterial = createGlowMaterial()
				}
				return glowMaterial;
			}
		}
	});



}());
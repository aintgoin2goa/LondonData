var color = (function(){

	function toHexWithPadding(number){
		var str = number.toString(16);
		if(str.length === 1){
			str = "0" + str;
		}
		return str;
	}

	function calculate(r, g, b){
		var colorObj;
		if(typeof r !== "number" && r.r && r.g && r.b){
			colorObj = r;
			r = colorObj.r;
			g = colorObj.g;
			b = colorObj.b;
		}

		var web = "rgb({R},{G},{B})"
				.replace("{R}", r)
				.replace("{G}", g)
				.replace("{B}", b);


		var three = parseInt((toHexWithPadding(r) + toHexWithPadding(g) + toHexWithPadding(b)), 16);

		return {
			three : three, 
			web : web
		};
	}

	return Object.create(null, {
		"calculate" : {
			value : calculate
		}
	});



}());
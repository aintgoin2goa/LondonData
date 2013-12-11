(function(){

	var data = [],
		boroughs = [],
		happiness = [],
		length = 0;

	function addColumns(){
		for(var i=0, l=length; i<l; i++){
			d3.select('svg').append('rect').attr({x:(i*3)+"%", y:0, width:"3%", height:happiness[i]+"%"});
		}
	}

	d3.json('data.json', function(recieved){
		length = recieved.length;
		recieved.forEach(function(obj){
			data.push(obj);
			boroughs.push(obj.Borough);
			happiness.push(parseInt(obj.Happiness.split('.')[1],10));
		});
		addColumns();
	});

}());
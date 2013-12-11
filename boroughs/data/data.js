var GoogleSpreadsheet = require("google-spreadsheet");
var fs = require("fs");

var spreadsheet = new GoogleSpreadsheet("0AonYZs4MzlZbdDNibnM4NXByQWJpQ2hMbUZobGNCMVE");

spreadsheet.getRows(1, function(err, data){
	if(err){
		console.error(err);
		return;
	}

	var jsonData = [];

	data.forEach(function(row){
		var population = parseFloat(row.population000s, 10);
		var lifeExpectancyM = parseFloat(row.lifeexpectancyatbirthyearsmales, 10);
		var lifeExpectancyF = parseFloat(row.lifeexpectancyatbirthyearsfemales, 10);
		var lifeExpectancyAv = (lifeExpectancyM + lifeExpectancyF) / 2;
		jsonData.push({
			name : row.title,
			population : population,
			lifeExpectancyM : lifeExpectancyM, 
			lifeExpectancyF : lifeExpectancyF,
			lifeExpectancyAv : lifeExpectancyAv
		});
	});

	fs.writeFileSync("data.json", JSON.stringify(jsonData, null, 2), {encoding:"utf8"});
	

});
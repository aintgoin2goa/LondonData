var GoogleSpreadsheet = require("google-spreadsheet");
var fs = require("fs");

var spreadsheet = new GoogleSpreadsheet("0AkQfZTveg_fkdFFfWlFFUUhMcnRNT3lRMkNlZ0V2eHc");

spreadsheet.getRows(1, function(err, data){
	if(err){
		console.error(err);
		return;
	}

	var jsonData = [];

	data.forEach(function(row){
		var lifeExpectancyM = parseFloat(row.lifeexpectancym, 10);
		var lifeExpectancyF = parseFloat(row.lifeexpectancyf, 10);
		var lifeExpectancyAv = (lifeExpectancyM + lifeExpectancyF) / 2;
		var data = {
			name : row.borough,
			population : parseFloat(row.population, 10),
			lifeExpectancyM : lifeExpectancyM,
			lifeExpectancyF : lifeExpectancyF,
			lifeExpectancyAv : lifeExpectancyAv,
			happiness : parseFloat(row.happiness, 10),
			employment : parseFloat(row.employment, 10),
			circulatoryDisease : parseFloat(row.circulatorydisease, 10)
		}
		jsonData.push(data);
	});

	fs.writeFileSync("data.json", JSON.stringify(jsonData, null, 2), {encoding:"utf8"});
	

});
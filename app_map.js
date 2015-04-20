var fs=require('fs'), readline = require('readline'), async=require('async');

// map category in input_proposed_raw.txt based on mapfile (and copy to input_proposed.txt)

var rawfile = fs.readFileSync('input_proposed_raw.txt').toString().split("\n");

// alchamy Type file
var mapfile = fs.readFileSync('AlchemyDBpediaMapping').toString().split("\n");


var replace = require("replace");

for(j in rawfile)  {


	var alc_proposed_type=rawfile[j];
	for(i in mapfile)  {
		var alc_type=mapfile[i].split(',')[0];
		var dbp_type=mapfile[i].split(',')[1];

		if(alc_proposed_type=alc_type){
			

				replace({
				  regex: alc_proposed_type,
				  replacement: dbp_type,
				  paths: ['replace'],
				  recursive: true,
				  silent: true,
				});
		}

	}




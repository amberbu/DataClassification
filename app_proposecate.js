// input file format: two columns separated by £ -- entityName£entityDescription
var fs=require('fs'), S=require('string'),readline = require('readline'), async=require('async');

var express = require('express');
var consolidate = require('consolidate');

var app = express();
var server = require('http').createServer(app);

//Create the DBpediaAPI object
var DBpediaAPI = require('./alchemyapi');
var alchemyapi = new DBpediaAPI();

// all environments
app.engine('dust',consolidate.dust);
app.set('views',__dirname + '/views');
app.set('view engine', 'dust');
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', example);


var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
	console.log('To view the example, point your favorite browser to: localhost:3000'); 
});




var myfile = fs.readFileSync('input_dbp120desc.txt').toString().split("\n");
for(i in myfile)  {
	// for(var i=0;i< myfile.length;i++)  {
		var item_name=[]
		item_name[i]=myfile[i].split('£')[0];
		console.log(item_name[i], i);
		alchemyapi.entities("text", myfile[i], {disambiguate:0}, function(response) {

			if(response.entities=== null||response.entities.length==0){
		      		fs.appendFile('input_proposed_raw.txt','NA'+'\n');
		      		console.log(" NO Result!!!");
			}
			else{
		      		fs.appendFile('input_proposed_raw.txt', response.entities[0]["type"]+'\n');	
		      		console.log(" Saved Result!!!");
			}


		    });

	}





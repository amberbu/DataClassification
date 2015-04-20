
*/
var fs=require('fs'), readline = require('readline'), async=require('async'), randy=require('randy');

// var LineByLineReader = require('line-by-line'),
//     lr = new LineByLineReader('dbp120desc_adjusted.csv');

// var lineReader = require('line-reader');

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

app.get('/', example);



var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
	console.log('To view the example, point your favorite browser to: localhost:3000'); 
});




function example(req, res) {
	var output = {};

	//Start the analysis chain
	entities(req, res, output);
}


function entities(req, res, output) {

var availcate = fs.readFileSync('all_lvl2n3_cateOrder.txt').toString().split("\n");
// console.log(availcate);
// var array = fs.readFileSync('input_proposed_cate.csv').toString().split("\n");
var array = fs.readFileSync('input_proposed.txt').toString().split("\n");
for(i in array) {
 // console.log(array[i].split("£")[1]);

 	var ptype=array[i].toString().split("£")[1];
 	// console.log(ptype);

 	var ptype_index=availcate.indexOf(ptype);
 	// console.log(ptype_index);
 	// var random_base=availcate.toString().splice(ptype_index, 1);
 	// console.log(random_base);


   var randno=randy.randInt (0, 10);
   if (ptype_index-randno >=0 && ptype_index+(10-randno)<=availcate.length){
      var options = availcate.slice(ptype_index-randno,ptype_index+(10-randno));
   }
   else{

      if (ptype_index-randno <0){
        var options = availcate.slice(0,10);
      }
      else{
        var options = availcate.slice(availcate.length-10,availcate.length);
      }
   }
   // console.log(options);
   fs.appendFile('options_groups.txt', options+'\n', function(err){
    if (err) throw err;
    console.log('Result is saved');
   });

}

}





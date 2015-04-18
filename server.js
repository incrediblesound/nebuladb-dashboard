var express = require('express');
var nebula = require('node_nebula');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

var server_data;

app.post('/save', function(req, res){
	var data = JSON.parse(req.body.save);
	nebula.save(data)
	res.end();
})

app.get('/data', function(req, res){
	res.end(server_data);
})

app.post('/query', function(req, res){
	var data = JSON.parse(req.body.query);
	nebula.query(data, function(result){
		server_data = JSON.stringify(result);
		res.end()
	})
})

app.post('/close', function(req, res){
	nebula.close();
	res.end()
})

app.post('/open', function(req, res){
	nebula.open({name:'app', isNew:false})
	res.end();
})

app.listen(3000);

var express = require("express")
  , redirect = require("express-redirect");
  var path = require('path');
 
var app = express();
redirect(app); 
var router = express.Router();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);

app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(bodyParser.urlencoded({
  extended: true
}));

server.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
app.set('port', (process.env.PORT || 5000));
app.use(router);
require('./routes/admin/testtxn')(app);
require('./routes/admin/pgredirect')(app);
require('./routes/admin/response')(app);
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

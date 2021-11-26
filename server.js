var express = require('express');
var path = require('path');

var app = express();

var bootstrapPath = path.resolve(__dirname, 'bootstrap/dist/');
var welcomePath = path.resolve(__dirname, 'welcome/dist/');
var musicPath = path.resolve(__dirname, 'music/build/');

app.use('/', express.static(bootstrapPath));

app.use('/mfe/welcome/', express.static(welcomePath));

app.use('/mfe/music/', express.static(musicPath));

app.get("*", function(request, response) {
	response.status(404).send('Page not found!');
});

app.listen(3000, function() {
	console.log('Express server started on port 3000');
});

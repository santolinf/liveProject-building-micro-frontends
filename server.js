const express = require('express');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

const app = express();

const bootstrapPath = path.resolve(__dirname, 'bootstrap/dist/');
const welcomePath = path.resolve(__dirname, 'welcome/dist/');
const musicPath = path.resolve(__dirname, 'music/build/');

app.use('/mfe/welcome/', express.static(welcomePath));
app.use('/mfe/music/', express.static(musicPath));
app.use('/', express.static(bootstrapPath));

app.get("*", function(request, response) {
	response.status(404).send('Page not found!');
});

app.listen(3000, function() {
	console.log(
		boxen(
			chalk.bold('Web Server running at: ') + chalk.underline.blue('http://localhost:3000')
			+ chalk.bold('\n\n' + chalk.cyan('Welcome ') + 'Micro Frontend: ') + chalk.underline.blue('http://localhost:3000/hello')
			+ chalk.bold('\n' + chalk.cyan('Music ') + 'Micro Frontend: ') + chalk.underline.blue('http://localhost:3000/play'),
			{ padding: 1, borderColor: 'green' }
		)
	);
});

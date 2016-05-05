var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var app = express();


var port = process.env.PORT || 3000;
var secport = port + 443;

// Create HTTP server.
var server = http.createServer(app);

//reading the certificate and the key
var options = {
	key: fs.readFileSync(__dirname + '/certificate/private.key'),
	cert: fs.readFileSync(__dirname + '/certificate/certificate.pem')
};

// Create HTTPS server
var secureServer = https.createServer(options, app);

// redirecting all requests to https 
app.all('*', (req, res, next)=>{
	if (req.secure) {
		return next();
	};
	res.redirect('https://' + req.hostname + ':' + secport + req.url);
});

app.get('/', (req, res) => {
	res.writeHead(200);
	res.end("hello world\n");
});

server.listen(port, ()=>{
	console.log('server listening on port', port);
})

secureServer.listen(secport, () => {
	console.log('server listening on port', secport);

});

var http = require('http');
var https = require('https');
var redirectHttps = require('redirect-https')
var le = require('greenlock-express').create({
    email: 'sp.mano40@outlook.com',
    agreeTos: true,
    configDir: '/etc/letsencrypt/live/',
    communityMember: true,
    telemetry: true,
    approveDomains: ['uniccan.com', 'www.uniccan.com'],
});
http.createServer(le.middleware(redirectHttps())).listen(80, function () {
    console.log("Server Running On http" + 80);
})
io = require('socket.io')(http);
https.createServer(le.httpsOptions, le.middleware(require('./app'))).listen(443, function () {
    console.log("Server Running On https" + 443);
})
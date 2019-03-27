require('greenlock-express').create({
    email: 'sp.mano40@outlook.com',
    agreeTos: true,
    configDir: '/etc/letsencrypt/live/',
    communityMember: true,
    telemetry: true,
    approveDomains: ['uniccan.com', 'www.uniccan.com'],
    app: function (req, res) {
        require('./my-express-app.js')(req, res);
    }
}).listen(80, 443);
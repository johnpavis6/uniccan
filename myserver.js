require('greenlock-express').create({
    email: 'sp.mano40@outlook.com',
    agreeTos: true,
    configDir: '/etc/letsencrypt/live/',
    communityMember: true,
    telemetry: true,
    approveDomains: ['uniccan.com', 'www.uniccan.com'],
    app: require('./app.js')
}).listen(80, 443);
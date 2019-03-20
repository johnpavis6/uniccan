var xss = require('xss');
var validator = require('validator');
module.exports.signin = function (req, res, next) {
    var data = {
        email: req.body.email,
        password: req.body.password,
    }
    var resp = null;
    if (!data.email || !validator.isEmail(data.email)) {
        resp = {
            code: 1,
            message: 'Invalid Email'
        };
    } else if (!data.password || data.password.length < 8) {
        resp = {
            code: 1,
            message: 'Password must be atleast 8 letters'
        };
    }
    if (resp) {
        req.session.resp = resp;
        res.redirect('/signin');
        return;
    }
    req.data = data;
    next();
}

module.exports.signup = function (req, res, next) {
    var data = {
        name: xss(req.body.name),
        email: xss(req.body.email),
        password: xss(req.body.password),
        mobile_no: xss(req.body.mobile_no),
        gender: xss(req.body.gender),
        dob: xss(req.body.dob),
    }
    console.log(data)
    var resp = null;
    if (!data.name || !data.name.length) {
        resp = {
            code: 1,
            message: 'Name must be atleast 1 letters'
        };
    } else if (!data.email || !validator.isEmail(data.email)) {
        resp = {
            code: 1,
            message: 'Invalid Email'
        };
    } else if (!data.password || data.password.length < 8) {
        resp = {
            code: 1,
            message: 'Password must be atleast 8 letters'
        };
    } else if (!data.mobile_no || !validator.isNumeric(data.mobile_no, {
            no_symbols: true
        })) {
        resp = {
            code: 1,
            message: 'Invalid Mobile No'
        };
    } else if (!data.dob || new Date(data.dob) == 'Invalid Date') {
        resp = {
            code: 1,
            message: 'Invalid DOB'
        };
    }
    if (resp) {
        req.session.resp = resp;
        res.redirect('/signup');
        return;
    }
    req.data = data;
    next()
}

module.exports.updateProfile = function (req, res, next) {
    var data = {
        id: parseInt(req.body.id),
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        education: req.body.education,
        skills: JSON.stringify(req.body.skills || []),
        hobbies: JSON.stringify(req.body.hobbies || []),
        extra_curricular_activities: JSON.stringify(req.body.extra_curricular_activities || []),
    }
    var resp = null;
    if (!data.name || !data.name.length) {
        resp = {
            code: 1,
            message: 'Name must be atleast 1 letters'
        };
    } else if (!data.dob || new Date(data.dob) == 'Invalid Date') {
        resp = {
            code: 1,
            message: 'Invalid DOB'
        };
    } else if (!data.education || !data.education.length) {
        resp = {
            code: 1,
            message: 'Invalid Education'
        };
    }
    if (resp) {
        res.status(400).json(resp);
        return;
    }
    req.data = data;
    next()
}

module.exports.isLoggedIn = function (req, res, next) {
    if (req.session.user) {
        // console.log('Logged User : ', req.session.user);
        next();
        return;
    }
    req.session.resp = {
        code: 1,
        message: 'Please login to continue'
    };
    res.redirect('/signin?redirect=' + req.url);
}

module.exports.setSocketID = function (req, res, next) {
    var data = {
        email: req.body.email,
        socketID: req.body.socketID,
        talking_with: req.body.talking_with
    }
    req.data = data;
    next();
}

module.exports.insertMessage = function (req, res, next) {
    var data = {
        _from: req.session.user.email,
        _to: req.body._to,
        message: xss(req.body.message).trim(),
        datetime: new Date().toString()
    }
    if (!data.message.length) {
        res.sendStatus(400);
        return;
    }
    req.data = data;
    next();
}
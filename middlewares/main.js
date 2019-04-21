var xss = require('xss').escapeHtml;
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

module.exports.forgotPassword = function (req, res, next) {
    var data = {
        email: xss(req.body.email),
    }
    console.log(data);
    var resp = null;
    req.session.resp = null;

    if (!data.email || !validator.isEmail(data.email)) {
        resp = {
            code: 1,
            message: 'Invalid Email'
        };
    }
    if (resp) {
        req.session.resp = resp;
        res.redirect('/forgotPassword');
        return;
    }
    req.data = data;
    next()
}

module.exports.changePassword = function (req, res, next) {
    var data = {
        forgot_id: req.session.forgotId,
        password1: xss(req.body.password1),
        password2: xss(req.body.password2),
    }
    var resp = null;
    req.session.resp = null;
    if (!data.password1 || data.password1.length < 8) {
        resp = {
            code: 1,
            message: 'Password must be atleast 8 letters'
        };
    } else if (data.password1 != data.password2) {
        resp = {
            code: 1,
            message: 'Password does not match'
        };
    }
    if (resp) {
        req.session.resp = resp;
        res.redirect('/changePassword?id='+data.forgot_id);
        return;
    }
    req.session.forgotId = null;
    req.data = data;
    next()
}
module.exports.updateProfile = function (req, res, next) {
    var data = {
        id: parseInt(req.body.id),
        name: xss(req.body.name),
        gender: xss(req.body.gender),
        dob: req.body.dob,
        education: xss(req.body.education),
        college_name: xss(req.body.college_name),
        degrees: xss(req.body.degrees),
        work_experiences: xss(JSON.stringify(req.body.work_experiences)),
        skills: xss(req.body.skills),
        hobbies: xss(req.body.hobbies),
        extra_curricular_activities: xss(req.body.extra_curricular_activities),
        knowledges: xss(req.body.knowledges),
    }
    console.log(data);
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
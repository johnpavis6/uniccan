module.exports.signin = function (req, res, next) {
    var data = {
        email: req.body.email,
        password: req.body.password,
    }
    req.data = data;
    next();
}

module.exports.signup = function (req, res, next) {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile_no: req.body.mobile_no,
        gender: req.body.gender,
        dob: req.body.dob,
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
    req.data = data;
    next()
}

module.exports.isLoggedIn = function (req, res, next) {
    if (req.session.user) {
        next();
        return;
    }
    req.session.resp = {
        code: 1,
        message: 'Please login to continue'
    };
    res.redirect('/signin?redirect=' + req.url);
}

module.exports.insertMessage = function (req, res, next) {
    var data = {
        _from: req.session.user.email,
        _to: req.body._to,
        message: req.body.message,
        datetime: new Date().toString()
    }
    console.log(data);
    req.data = data;
    next();
}
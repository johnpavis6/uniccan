var bcrypt = require('bcrypt');
var saltRounds = 10;
var connection = require('../db').connection;
var shortid = require('shortid');
var sendMail = require('../nodemailer').sendmail;

module.exports.signin = function (req, res) {
    connection.query('select * from users where email=?',
        [req.data.email],
        function (err, results) {
            if (err) {
                console.log('ERR : ', err);
            }
            if (!results || !results.length) {
                req.session.resp = {
                    code: 1,
                    message: 'Invalid Email'
                };
                res.redirect('/signin');
                return;
            }
            var flag = bcrypt.compareSync(req.data.password, results[0].password);
            if (flag) {
                delete results[0]['password'];
                req.session.user = results[0];
                res.redirect(req.body.redirect);
                return;
            }
            req.session.resp = {
                code: 1,
                message: 'Invalid Password'
            };
            res.redirect('/signin');
        })
}

module.exports.signup = function (req, res) {
    var data = req.data;
    data.password = bcrypt.hashSync(data.password, saltRounds);
    connection.query('insert into users set ?',
        [req.data],
        function (err, result) {
            if (err) {
                console.log('ERR : ', err);
                req.session.resp = {
                    code: 1,
                    message: 'Email or Mobile No already Exists',
                };
                res.redirect('/signup');
                return;
            }
            data.id = result.insertId;
            delete data['password'];
            req.session.user = data;
            res.redirect('/profile');
        });
}
module.exports.forgotPassword = function (req, res) {
    var forgot_password = shortid.generate();
    var data = {};
    var timeInMss = Date.now();
    forgot_password += timeInMss;
    data.forgot_password = forgot_password;
    connection.query('update users set ? where email=?',
        [data, req.data.email],
        function (err, result) {
            if (err) {
                console.log('ERR : ', err);
                res.status(400).json({
                    code: 1,
                    message: 'Update Error'
                });
                return;
            }
            var url = "https://uniccan.com/changePassword?id=" + forgot_password;
            var html = `<a href='http://uniccan.com/changePassword?id=` + forgot_password + `'>click me to reset your password for uniccan</a>`;
            sendMail(req.data.email, 'Link to reset your password', html);
            res.redirect('/signin');
        });
}

module.exports.changePassword = function (req, res) {
    var data = {};
    data.password = bcrypt.hashSync(req.data.password1, saltRounds);
    connection.query('update users set ? where forgot_password=?',
        [data, req.data.forgot_id],
        function (err, result) {
            if (err) {
                console.log('ERR : ', err);
                res.status(400).json({
                    code: 1,
                    message: 'Update Error'
                });
                return;
            }
            res.redirect('/signin');
        });
}

module.exports.updateProfile = function (req, res) {
    var data = req.data;
    connection.query('update users set ? where id=?',
        [req.data, req.data.id],
        function (err, result) {
            if (err) {
                console.log('ERR : ', err);
                res.status(400).json({
                    code: 1,
                    message: 'Update Error'
                });
                return;
            }
            for (key in data) {
                req.session.user[key] = data[key];
            }
            res.sendStatus(200);
        });
}

module.exports.search = function (req, res) {
    var q = req.body.q.trim();
    if (!q || !q.length) {
        res.json([]);
        return;
    }
    var query = `select * from users where name like '%${q}%' or college_name like '%${q}%' or work_experiences like '%${q}%' or skills like '%${q}%' or hobbies like '%${q}%' or extra_curricular_activities like '%${q}%' or knowledges like '%${q}%'`;
    connection.query(query, function (err, results) {
        if (err) {
            console.log('ERR : ', err);
        }
        res.json(results);
    });
}

module.exports.getSuggestionsName = function (req, res) {
    query = `select name as value from users`;
    connection.query(query, function (err, results) {
        if (err) {
            console.log('ERR : ', err);
        }
        res.json(results);
    });
}

module.exports.getSuggestionsWorkexp = function (req, res) {
    query = `select work_experiences as value from users`;
    connection.query(query, function (err, results) {
        if (err) {
            console.log('ERR : ', err);
        }
        res.json(results);
    });
}

module.exports.getSuggestionsOthers = function (req, res) {
    query = `select education as value from users 
    union select hobbies from users union select extra_curricular_activities from users 
    union select involvements from users union select skills from users 
    union select knowledges from users union select college_name from users 
    union select degrees from users`;
    connection.query(query, function (err, results) {
        if (err) {
            console.log('ERR : ', err);
        }
        res.json(results);
    });
}


module.exports.mynotifications = function (req, res) {
    connection.query('select name,b.id as _from,count(*) as count from messages as a,users as b where email=_from and seenstatus=0 and _to=? group by _from',
        [req.session.user.email],
        function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('New Messages : ', results);
            res.json(results);
        })
}
module.exports.mychats = function (req, res) {
    var email = req.session.user.email;
    connection.query('select id as email,name from users where email in (select distinct _from as email from messages as a, users as b where email=_from and _to=? union select distinct _to as email from messages as a, users as b where email=_to and _from=?)',
        [email, email],
        function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log(results);
            res.json(results);
        })
}

module.exports.chat = function (req, res) {
    connection.query('select * from users where id=?',
        [req.params.id],
        function (err, results) {
            if (err) {
                console.log('ERR : ', err);
            }
            if (!results || !results.length) {
                res.redirect('/');
                return;
            }
            res.render('chat', {
                user: req.session.user,
                receiver: results[0]
            });
            connection.query('update messages users set seenstatus=1 where _from=? and _to=?',
                [results[0].email, req.session.user.email],
                (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                });
        });
}

module.exports.setSocketID = function (req, res) {
    connection.query('insert into socket_mapping set ? on duplicate key update ?',
        [req.data, req.data],
        function (err, results) {
            if (err) {
                console.log('ERR : ', err);
                res.json({
                    code: 0
                });
                return;
            }
            connection.query('update users set last_seen="online" where email=?',
                [req.data.email],
                function (err, results) {
                    if (err) {
                        console.log('ERR : ', err);
                    }
                });
            res.json({
                code: 1
            });
        });
}

module.exports.getMessages = function (req, res) {
    var email = req.session.user.email,
        cemail = req.query._from;
    connection.query('select * from messages where (_from=? and _to=?) or (_from=? and _to=?)',
        [email, cemail, cemail, email],
        function (err, results) {
            // console.log('Messages : ', results);
            res.json(results);
        });
}
module.exports.insertMessage = function (req, res) {
    connection.query('select socketID from socket_mapping where email=? and talking_with=?',
        [req.data._to, req.session.user.email],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            req.data.seenstatus = 1;
            if (!results || !results.length) {
                req.data.seenstatus = 0;
            }
            connection.query('insert into messages set ?', req.data, function (err, results) {
                if (err) {
                    if (err) {
                        console.log('ERR : ', err);
                    }
                    res.sendStatus(400);
                    return;
                }
                res.json(req.data);

            });
            results.forEach(user => {
                io.to(user.socketID).emit('messages', JSON.stringify(req.data));
            })
        })
}
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        connection.query('update users set last_seen=? where email in (select email from socket_mapping where socketID=? group by email having count(email)=1)',
            [new Date().toString(), socket.id, socket.id],
            function (err, results) {
                if (err) {
                    console.log('ERR : ', err);
                }
            })
        connection.query('delete from socket_mapping where socketID=?',
            [socket.id],
            function (err, results) {
                if (err) {
                    console.log('ERR : ', err);
                }
                // console.log('Last seen update result : ', results);
            });
    })
})
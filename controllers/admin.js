var connection = require('../db').connection;

module.exports.login = function (req, res) {
    // res.redirect('/signin');
    if (req.body.password != 'uniccanmano') {
        req.session.resp = {
            code: 1,
            message: 'Invalid Password'
        };
        res.redirect('/admin');
        return;
    }
    req.session.admin = true;
    res.redirect('/admin/dashboard');
}

module.exports.dashboard = function (req, res) {
    connection.query('select * from users',
        function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('Users : ', results);
            res.render('admin/dashboard',{
                users : results
            });
        })
}
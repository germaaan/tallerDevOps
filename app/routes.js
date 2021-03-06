"use strict";

var urlencodedParser = require('body-parser').urlencoded({
    extended: false
});

module.exports = function(app) {
    app.use(function(req, res, next) {
        if (typeof(req.session.todolist) == 'undefined') {
            req.session.todolist = [];
        }
        next();
    });

    app.get('/todo', function(req, res) {
        res.render('todo.ejs', {
            todolist: req.session.todolist
        });
    });

    app.post('/todo/add/', urlencodedParser, function(req, res) {
        if (req.body.newtodo != '') {
            req.session.todolist.push(req.body.newtodo);
        }
        res.redirect('/todo');
    });

    app.get('/todo/delete/:id', function(req, res) {
        if (req.params.id != '') {
            req.session.todolist.splice(req.params.id, 1);
        }
        res.redirect('/todo');
    });

    app.use(function(req, res, next) {
        res.redirect('/todo');
    });

};

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var apiRouter = require('./routes/api');
var homeRouter = require('./routes/home')

var app = express();

var Sequelize = require("sequelize");
var session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var sequelize = new Sequelize({
    "dialect": "sqlite",
    "storage": "./session.sqlite"
});

var myStore = new SequelizeStore({
    db: sequelize
})

// enable sessions
app.use(
    session({
        secret: "keyboard cat",
        store: myStore,
        resave: false,
        proxy: true,
    })
);

myStore.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
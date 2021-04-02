var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRegisterRouter = require('./routes/student-registration-route');
var studentloginRouter = require('./routes/student-login-route');
var dashboardRouter = require('./routes/dashboard-route');
var logoutRouter = require('./routes/logout-route');
var teacherloginRouter = require('./routes/teacher-login-route');
var teacherRegisterRouter = require('./routes/teacher-registration-route');
var adminloginRouter = require('./routes/admin-login-route');
var teacherElectiveRouter = require('./routes/teacher-elective-route');
var querypageRouter = require('./routes/querypage-route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', studentRegisterRouter);
app.use('/', studentloginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/',teacherloginRouter);
app.use('/',teacherRegisterRouter);
app.use('/',adminloginRouter);
app.use('/',teacherElectiveRouter);
app.use('/',querypageRouter);
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

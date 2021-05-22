var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var favicon = require('serve-favicon');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRegisterRouter = require('./routes/student-registration-route');
var studentloginRouter = require('./routes/student-login-route');
var dashboardRouter = require('./routes/dashboard-route');
var logoutRouter = require('./routes/logout-route');
var teacherloginRouter = require('./routes/teacher-login-route');
var teacherRegisterRouter = require('./routes/teacher-registration-route');
var teacherDashboardRouter = require('./routes/teacherdash-route');
var adminloginRouter = require('./routes/admin-login-route');
var querypageRouter = require('./routes/querypage-route');
var addelectiveRouter = require('./routes/addelective-route');
var studentelectiveRouter = require('./routes/student-elective-route');
var selectstudentRouter = require('./routes/select-student-route');
var studenteditprofileRouter = require('./routes/student-edit-profile-route');
var admindashRouter = require('./routes/admindash-route');
var adminaddstudRouter = require('./routes/adminaddstud-route');
var querypageadminRouter = require('./routes/querypageadminroute');
var adminelectiveRouter = require('./routes/admin-elective-route');
var studenExcelRouter = require('./routes/student-excel');
var studenExcelRouter1 = require('./routes/student-excel-route2');
var studenExcelRouter2 = require('./routes/student-excel-route3');
var studentProfileRouter = require('./routes/studentprofile-route');
var teacherProfileRouter = require('./routes/teacherprofile-route');
var studentdashRouter = require('./routes/studentdash-route');
var teacheraddelectiveRouter = require('./routes/teacher-addelective-route');
var teacherquerypageRouter = require('./routes/teacher-querypage-route');

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
  cookie: { maxAge: 864000000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use("/public", express.static('public')); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', studentRegisterRouter);
app.use('/', studentloginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/',teacherloginRouter);
app.use('/',teacherRegisterRouter);
app.use('/',teacherDashboardRouter);
app.use('/',adminloginRouter);
app.use('/',querypageRouter);
app.use('/',addelectiveRouter);
app.use('/',studentelectiveRouter);
app.use('/',selectstudentRouter);
app.use('/',studenteditprofileRouter);
app.use('/',admindashRouter);
app.use('/',adminaddstudRouter);
app.use('/',querypageRouter);
app.use('/',querypageadminRouter);
app.use('/',adminelectiveRouter);
app.use('/',studenExcelRouter);
app.use('/',studenExcelRouter1);
app.use('/',studenExcelRouter2);
app.use('/',studentProfileRouter);
app.use('/',teacherProfileRouter);
app.use('/',studentdashRouter);
app.use('/',teacheraddelectiveRouter);
app.use('/',teacherquerypageRouter);

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

const express = require("express");
const app = express();
var createError = require('http-errors');
require("dotenv").config()
const allowCrossDomain = require('./utils/cors');
const port = process.env.PORT || 5000;
const endpoints = require('./endpoints');
require("./utils/mongodbConfig").initializeDB();

app.listen(port, () => {  console.log('We are live on ' + port);});
app.use(allowCrossDomain);
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressValidator());
endpoints.initialise(app);

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
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;


//Welcome learning courses.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();


var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.of('chat').on('connection', function(socket) {
  //连接成功
  socket.emit('message', '连接成功！');
  socket.on('message', function(data) {
    console.log(data);
  });
  socket.on('disconnect', function() {
      //用户已经离开
  });
  // socket.join('chat');//进入chat房间
// socket.leave('chat');//离开chat房间

// 全局广播消息
  // socket.broadcast.emit('DATA', "沙楞的");
// 局部广播消息
  // socket.broadcast.to('chat').emit('DATA', 'chat');
});

// io.use(function(socket, next) {
//   if(socket.request.headers.cookie) {
//     return next();
//   }
//   next(new Error('Authentication error'));
// });
// 接收客户端传过来的参数
// io.use(function (socket) {
//   var query = socket.request._query;
//   var sid = query.sid;
//   // console.log(sid);
// });




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(3000);


module.exports = app;
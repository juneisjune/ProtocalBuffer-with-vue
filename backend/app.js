var createError = require('http-errors');     //HTTP 오류 생성 유틸리티
var express = require('express');             //Express.js 웹 프레임워크
var path = require('path');                   //`path`: 파일 경로 처리 유틸리티
var cookieParser = require('cookie-parser');  //`cookieParser`: 쿠키 파싱 미들웨어
var logger = require('morgan');               //`logger`: HTTP 요청 로깅 미들웨어

//각각의 라우트  핸들러를 별도 파일로 분리하여 관리
var indexRouter = require('./routes/index');    // 메인 페이지 라우터
var usersRouter = require('./routes/users');    //사용자 관리 라우터
const protoRouter = require("./routes/proto");  //Protobuf 처리 라우터

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));          //뷰 파일 위치 지정
app.set('view engine', 'jade');                           //jade/Pug 템플릿 엔진 사용

app.use(logger('dev'));                                   //개발용 로깅
app.use(express.json());                                  //JSON 파싱
app.use(express.urlencoded({ extended: false }));         //URL 인코딩 데이터 파싱
app.use(cookieParser());                                  //쿠키 파싱
app.use(express.static(path.join(__dirname, 'public')));  //정적 파일 제공

app.use('/', indexRouter);                                 //루트 경로 처리
app.use('/users', usersRouter);                            // /users 경로 처리
app.use("/api/proto", protoRouter);                        // 에러 핸들러 전에 위치

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
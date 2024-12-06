var express = require('express');   //Express 프레임워크의 Router 인스턴스 생성
var router = express.Router();      //모듈화된 라우팅 처리를 위한 미들웨어 준비

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourceㅇ');
});

module.exports = router;

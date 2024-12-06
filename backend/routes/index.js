var express = require('express');
var router = express.Router();

//req= 방문자의 요청(request) res=우리가 보낼줄 응답(response)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '기본화면' });
});
router.get('/kaka/', function(req,res,next){
  res.render('index', {title: 'skaka'});
});

//만든 라우터를 다른 파일에서 사용할 수 있게 내보냄
//이렇게 하면 app.js 같은 메인 팡엘에서 라우터를 사용할 수 있음
module.exports = router;


/**
 * 1. 사용자가 웹사이트 주소를 입력하면
 * 2. 라우터가 그 요청을 받아서 처리
 * 3.`index` 페이지를 렌더링 하고 `기본화면` 라는 제목을 넣어서
 * 4. 사용자에게 완성된 웹페이지를 보여줌
 */

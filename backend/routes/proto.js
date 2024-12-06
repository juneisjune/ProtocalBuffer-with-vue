const express = require("express");       //웹서버를 만드는 곳
const router = express.Router();          //router 웹요청을 처리하는 관리자
const protobuf = require("protobufjs");   //protobuf: 데이터를 효율적으로 압축하는 도구
const path = require("path");             //path: 파일 경로를 쉽게 다루는 도구

router.get("/", async function (req, res) {
  try {
    
    const protoPath = path.join(__dirname, "../test.proto");  //proto 파일 찾기
    console.log("Proto file path:", protoPath);
    
    //데이터 형식 불러오기
    const root = await protobuf.load(protoPath);
    const PersonMessage = root.lookupType("test.Person");
    
    const payload = { name: "june", age: 27 };
    const errMsg = PersonMessage.verify(payload);
    
    if (errMsg) {
      throw new Error(errMsg);
    }

    //데이터를 검사하고 변환
    const message = PersonMessage.create(payload);
    const buffer = PersonMessage.encode(message).finish(); //encode()는 데이트를 압축
    
    res.set('Content-Type', 'application/x-protobuf');    //받는 사람으로 하여금 프로토 버퍼로 작성 되었음을 알려줌
    res.send(buffer);   //압축된 데이터를 보내는 과정
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

module.exports = router;
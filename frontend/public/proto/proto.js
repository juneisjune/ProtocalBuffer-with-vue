  /*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
//이 파일은 protobufjs로 생성된 java script 모듈로 , protocol buffer의 정의를 java script에서 사용할 수 있게 변환한 것
"use strict"; //eslint ㅏ엄격 모드

var $protobuf = require("protobufjs/light");  //protobufjs의 경량 버전을 사용

//새로운 Protobuf Root 객체 생성
var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))

//프로토 문법3 사용
.setOptions({
  syntax: "proto3"
})

.addJSON({
  test: {
    nested: {
      Person: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          age: {
            type: "int32",
            id: 2
          }
        }
      }
    }
  }
});

module.exports = $root;

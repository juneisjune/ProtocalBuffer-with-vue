<template>
  <div id="app">
    <button type="button" @click="getData">test</button>  <!-- test 버튼 클릭 시 getData 메소드 실행 -->
    {{ person }}
  </div>
</template>

<script>
import * as protobuf from 'protobufjs';

export default {
  name: "App",
  data() {
    return {
      person: {},       //Protobuf 데이터 저장
      connection: null  //WebSocket 연결 객체
    };
  },
  created() {
    console.log("WebSocket 서버에 연결 시도");
    this.connection = new WebSocket('ws://localhost:8080/ws'); //WebSocket 클라이언트 인스턴스 생성
    
    this.connection.onmessage = (event) => {
      console.log(event);
      //onmessgae : 서버로부터 메시지를 받았을 때 실행되는 이벤트 핸들러
    };
    
   

    this.connection.onerror = (error) => {
      console.error("WebSocket 연결 오류:", error);
    };
  },
    methods: {
    async getData() {
      try {
        //HTTP GET 요청으로 바이너리 데이터 수신
        const response = await this.$http.get("/api/proto", {
          responseType: "arraybuffer"//응답 데이터 타입 설정
        });
        
        //Proto 파일 로드 및 메시지 타입 확득
        const root = await protobuf.load("/proto/test.proto");
        const PersonMessage = root.lookupType("test.Person");

        //바이너리 데이터 디코딩
        const decoded = PersonMessage.decode(new Uint8Array(response.data));
        //PersonMessgae.decode(): Unit8Array를 JavaScript 객체로 디코딩
        //new Uint8Array() ArrayBuffer를 8비트 부호 없는 정수 배열로 변환
        //response.data: Arraybuffer 형태의 원본 바이너리 데이터

        this.person = decoded;
        
        console.log("Decoded data:", decoded);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
};
</script>

<style>
</style>
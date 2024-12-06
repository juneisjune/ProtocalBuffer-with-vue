<template>
  <div id="app">
    <button type="button" @click="getData">test</button>
    {{ person }}
  </div>
</template>

<script>
import * as protobuf from 'protobufjs';

export default {
  name: "App",
  data() {
    return {
      person: {},
      connection: null
    };
  },
  created() {
    console.log("WebSocket 서버에 연결 시도");
    this.connection = new WebSocket('ws://localhost:8080/ws');
    
    this.connection.onmessage = (event) => {
      console.log(event);
    };
    
   

    this.connection.onerror = (error) => {
      console.error("WebSocket 연결 오류:", error);
    };
  },
    methods: {
    async getData() {
      try {
        const response = await this.$http.get("/api/proto", {
          responseType: "arraybuffer"
        });
        
        const root = await protobuf.load("/proto/test.proto");
        const PersonMessage = root.lookupType("test.Person");
        const decoded = PersonMessage.decode(new Uint8Array(response.data));
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
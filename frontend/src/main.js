//모든 컴포넌트에서 this.$http.get 과 같은 방식으로 http통신가능하도록 main.js파일에서 아래와 같이 추가하였다.
import Vue from "vue";        //Vue.js 코어 라이브러리
import App from "./App.vue";  //루트 컴포넌트
import axios from "axios";    //HTTP 클라이언트 라이브러리


//프로덕션 환경에서의 팁 메시지 비활성화
//개발 모드 관련 코솔 출력 제어
Vue.config.productionTip = false;

//Vue 인스턴스의  프로토바트에 axois를 `$http`로 추가
// 모든 컴포넌트에서 `this.$http`로 접근 가능
//컴포넌트마다 axios를 임포트할 필요 없음
Vue.prototype.$http = axios;


//새로운 Vue 인스턴스 생성
//`render`함수로 App 컴포넌트 렌더링
//`$mount("#app")로 DOM에 마운트
new Vue({
  render: (h) => h(App),
}).$mount("#app");
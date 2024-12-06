//모든 컴포넌트에서 this.$http.get 과 같은 방식으로 http통신가능하도록 main.js파일에서 아래와 같이 추가하였다.
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
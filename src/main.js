import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Swiper from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css' //样式文件
Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

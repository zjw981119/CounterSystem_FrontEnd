import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
import VueAxios from'vue-axios'
import qs from 'qs'

/*
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //最后必须return config
  return config
})
Vue.prototype.$http = axios
*/
Vue.use(VueAxios,axios)
Vue.config.productionTip = false
Vue.prototype.$qs=qs

new Vue({
  // 配置路由
  router,
  render: h => h(App)
}).$mount('#app')

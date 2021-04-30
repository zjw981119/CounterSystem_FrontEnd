import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Config from '../components/config/Config.vue'
import Statistics from '../components/statistics/Statistics.vue'

// 安装路由模块
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/config', component: Config },
        { path: '/statistics', component: Statistics }
      ]
    }
  ]
})

/*
//挂载路由导航守卫
router.beforeEach((to,from,next) => {
    //to 将要访问的路径
    //from 从哪个路径而来
    //next 函数，放行 
    //next() 放行  next('/login')强制跳转

    if(to.path === '/login') return next();
    //获取token
    const tokenStr= window.sessionStorage.getItem('token')
    //未获得token,强制跳转
    if(!tokenStr) return next('/login')
    next()
})
*/

export default router


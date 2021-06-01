import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import AuxmacFuelRecord from '../components/record/AuxmacFuelRecord.vue'
import MacRecord from '../components/record/MacRecord.vue'
import DiggerProduction from '../components/record/DiggerProduction.vue'
import CarFuel from '../components/record/CarFuel.vue'
import CarRecord from '../components/record/CarRecord.vue'
import Statistics from '../components/record/Statistics.vue'
import DiggerConfig from '../components/config/DiggerConfig.vue'
import CarConfig from '../components/config/CarConfig.vue'
import AuxMacConfig from '../components/config/AuxiliaryMacConfig.vue'
import RfidConfig from '../components/config/RfidCarConfig.vue'
import MachineDetail from '@/components/record/MachineDetail'


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
        { path: '/auxfuelrecord', component: AuxmacFuelRecord },
        { path: '/macrecord', component: MacRecord },
        { path: '/diggerproduction', component: DiggerProduction },
        { path: '/carfuel', component: CarFuel },
        { path: '/carrecord', component: CarRecord },
        { path: '/statistics', component: Statistics },
        { path: '/diggerconfig', component: DiggerConfig },
        { path: '/carconfig', component: CarConfig },
        { path: '/auxmacconfig', component: AuxMacConfig },
        { path: '/rfidconfig', component: RfidConfig },
        { path: '/machinedetail', component: MachineDetail },
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


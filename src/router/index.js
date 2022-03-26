import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Welcome from '../components/Welcome.vue'
import Maintain from '../views/EquimentMaintain/maintain.vue';
import ScrapApply from '../views/EquimentScrap/scrapApply.vue';
import ScrapHandle from '../views/EquimentScrap/scrapHandle.vue';
import PurchaseApply from '../views/PurchaseManage/purchaseApply.vue';
import PurchaseApprove from '../views/PurchaseManage/purchaseApprove.vue';
import CheckStorage from '../views/StorageEquipment/checkStorage.vue';
import StorageMessage from '../views/StorageEquipment/storageMessage.vue';
import UserManage from '../views/SystemMaintain/userManage.vue';
import Login from '../views/Login/index.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect是重定向的意思，
    // 将APP打开是的页面展示文/welcome的页面
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/maintain',
        component: Maintain
      },
      {
        path: '/scrapApply',
        component: ScrapApply
      },
      {
        path: '/scrapHandle',
        component: ScrapHandle
      },
      {
        path: '/purchaseApply',
        component: PurchaseApply
      },
      {
        path: '/purchaseApprove',
        component: PurchaseApprove
      },
      {
        path: '/checkStorage',
        component: CheckStorage
      },
      {
        path: '/storageMessage',
        component: StorageMessage
      },
      {
        path: '/userManage',
        component: UserManage
      }
    ]
  }
]



const router = new VueRouter({
  routes


})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果保存在sessionStorage中的token是空的话，将页面跳转到/login
  if (!tokenStr) {
    return next('/login')
  }
  console.log(tokenStr)
  next()
})

export default router

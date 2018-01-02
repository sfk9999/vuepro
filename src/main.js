// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routers from './routes'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

//全局守卫
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
}).$mount('#app')

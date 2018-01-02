import Login from './components/Login.vue'
import NotFound from './components/404.vue'
import Home from './components/Home.vue'
import Table from './components/nav/Table.vue'

let routes=[
  {
    path:'/login',
    component:Login,
    name:'',
  },
  {
    path:'/404',
    component:NotFound,
    name:'',
  },
  // {
  //   path:'/',
  //   component: Home,
  //   name:'导航一',
  //   iconCls: 'el-icon-message',//图标样式class
  //   children:[
  //     // {path:'/main',component:Main,name:'主页'}
  //     {path:'/table',component:Table,name:'Table'}
  //   ]
  // }
  {
    path:'table',
    component:Table,
    name:'Table'
  }
];
export default routes;

import Login from './components/Login.vue'
import NotFound from './components/404.vue'
import Home from './components/Home.vue'
import Table from './components/nav/Table.vue'
import Table2 from './components/nav/Table2.vue'
import List from './components/nav/List.vue'

let routes=[
  {
    path:'/',
    component:Login,
    name:'',
    hidden: true
  },
  {
    path:'/404',
    component:NotFound,
    name:'',
    hidden: true
  },
  {
    path:'/',
    component:Home,
    name:'导航一',
    iconCls:'el-icon-message',
    children:[
      { path: '/table', component: Table, name: 'Table' },
      { path: '/list', component: List, name: 'List' },
      { path: '/table2', component: Table2, name: 'Table2' }
    ]
  }
];
export default routes;

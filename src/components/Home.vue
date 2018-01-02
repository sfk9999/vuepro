<template>
  <el-row class="container">
    <el-col :span="24" class="o-header">
      <el-col :span="6" class="logo">
        欢迎登录
      </el-col>
      <el-col :span="14"></el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <!--@click.native组件中的原生事件-->
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="o-main">
      <!--侧栏-->
      <aside class="i-aside">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo i-aside-munu" unique-opened router>
              <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                  <el-submenu :index="index+''">
                    <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
                  </el-submenu>
              </template>
          </el-menu>
      </aside>
      <!--主要内容-->
      <section class="i-main">
          <el-col :span="24">
            <strong>{{$route.name}}</strong>
          </el-col>
          <el-col :span="24" class="content-warpper">
            <router-view></router-view>
          </el-col>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  export default{
      data(){
          return{
            sysUserName:'',
          }
      },
      methods:{
          //退出登录
          logout:function(){
              var _this=this;
              this.$confirm('确认退出吗？','提示',{
              }).then(()=>{
                  sessionStorage.removeItem('user');
                  _this.$router.push('/');
              })
          }
      },
      mounted(){
          var user = sessionStorage.getItem('user');
          if(user){
              user=JSON.parse(user);
              this.sysUserName=user.username || '';
          }
      }
  }

</script>

<style>
  *{
    margin: 0px;
    padding: 0px;
  }
  .container{
    position: absolute;
    top:0px;
    bottom:0px;
    width: 100%;
  }
.o-header{
  height: 60px;
  line-height: 60px;
  background: #409EFF;
}
.logo{
  height: 60px;
  color: white;

}
.userinfo{
  text-align: right;
  padding-right: 40px;
  float: right;
  cursor:pointer;
}
.userinfo span{
  color: white;
}
.o-main{
  display: flex;
  position: absolute;
  top:60px;
  bottom:0px;
  overflow: hidden;
}
.o-main aside{
  width: 230px;
  flex:0 0 230px;
}
.i-aside-munu{
  height: 100%;
}
.i-main{
  flex:1;
  padding:20px;
  overflow-y: scroll;
}

</style>

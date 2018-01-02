<template>
  <el-form :model="ruleForm" :rules="loginRules" ref="ruleForm" class="login" label-position="left" label-width="70px">
    <h3>系统登录</h3>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passWord">
      <el-input v-model="ruleForm.passWord" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item class="btn-out">
      <el-button type="primary" @click="onSubmit" class="btn-in">登录</el-button>
      <el-button @click="handleReset" class="btn-in-reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>



<script>
//  import datas from'../util/mock';
import md5 from 'js-md5';
  export default{
      data(){
          return{
//              logining:false,
              ruleForm:{
                userName:'admin',
                passWord:'123456'
              },
              loginRules:{
                  userName:[
                    {required:true,message:'请输入账号',trigger:'blur'}
                  ],
                  passWord:[
                    {required:true,message:'请输入密码',trigger:'blur'}
//                    {min:6,max:10,message:'长度在6-10个字符',trigger:'blur'}
                  ]
              }
          };
      },
      methods:{
          //提交
          onSubmit:function(ev){
              var that=this;
              //对整个表单进行校验的方法
              this.$refs.ruleForm.validate((valid)=>{
                  if(valid){
//                      this.logining=true;
                      var user={username:this.ruleForm.userName, password:md5(this.ruleForm.passWord)};
                      sessionStorage.setItem('user',JSON.stringify(user));
                      this.$router.push({path:'/table'});
                  }else {
                    console.log('error submit!!');
                    return false;
                  }
              })
          },
          //重置
          handleReset:function(){
                this.$refs.ruleForm.resetFields();
          }
//          getUser:function(){
//                this.$http.get('http://g.cn').then((res)=>{
//                    this.ruleForm.userName=res.body.name;
//                    console.log(this.ruleForm.userName);
//            });
          }

//      mounted(){
//          this.getUser();
//      }
  }

</script>

<style scoped>
.login{
  margin:180px auto;
  width: 400px;
  border:1px solid #eaeaea;
  padding: 40px;
  -webkit-box-shadow: 0 0 25px #eaeaea;
  -moz-box-shadow: 0 0 25px #eaeaea;
  box-shadow: 0 0 25px #eaeaea;
}
  .btn-out{
    width: 100%;
  }
  .btn-in{
    width: 70%;
  }
  .btn-in-reset{
    float: right;
  }

</style>

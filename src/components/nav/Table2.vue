<template>
  <section>
    <!--查询工作条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%" @selection-change="selsChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
      <el-table-column prop="birth" label="生日" width="100" sortable></el-table-column>
      <el-table-column prop="addr" label="地址" min-width="160" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEidt(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-col :span="24">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.lenght===0">批量删除</el-button>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </el-col>

    <!--编辑-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-input v-model="editForm.birth"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import datas from'../../util/mock2';
  export default{
    data(){
      return{
        filters: {
          name: '',
          age:'',
          birth:'',
          addr:''
        },
        users:[],
        listLoading:false,
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        total:0,
        page:1,
        sels:[],
        editForm:{  //编辑界面数据
          id:0,
          name:'',
          age:0,
          birth:'',
          addr:'',
        }
      }
    },
    methods:{

      handleAdd:function(){
        console.log(1);
      },
      handleCurrentChange :function(val){
        this.page=val;
        this.getUsers();
      },
//        打开编辑窗口
      handleEidt:function(index,row){
        this.editFormVisible = true;
//              将此行数据赋值给窗口内
        this.editForm = Object.assign({}, row);
      },
//          编辑提交
      editSubmit:function(){
        this.$http.put('http://g.cn').then((response)=>{
          this.getUsers();
        });
        this.$message({
          message:'成功',
          type:'success'
        });
        this.editFormVisible = false;
        this.getUsers();
      },
//        获取数据
      getUsers:function(){
        this.listLoading=true;
            this.$http.get('http://g.cn').then((res)=>{
                this.total=res.body.list.length;
                this.users=res.body.list;
//                console.log(res);
                this.listLoading=false;
            });
      },
      updateUsers:function(){
        this.listLoading=true;

      },
      handleDel:function(index,row){
        this.$confirm('确认删除该记录吗?','提示',{
          type:'warning'
        }).then(()=>{
          this.listLoading=true;
          this.$http.delete('http://g.cn').then((res)=>{
              this.listLoading=false;
              this.$message({
                message:'删除成功',
                type:'success'
              });
              this.getUsers();
          });

        });
      },
      selsChange:function(sels){
        this.sels=sels;
      },
//          批量删除
      batchRemove:function(){
        var ids = this.sels.map(item=>item.id);
        this.$confirm('确认删除选中的记录么',"提示",{
          type:'warning'
        }).then(()=>{
          this.listLoading=true;
          let para={ids:ids};
          batchRemoveUser(para).then((res)=>{
            this.listLoading=false;
            this.$message({
              message:'删除成功',
              type:'success'
            });
            this.getUsers();
          })
        });
      }
    },
    mounted(){
      this.getUsers();
    }
  }

</script>

<style>


</style>

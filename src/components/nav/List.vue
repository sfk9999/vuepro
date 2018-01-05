<template>
  <div class="conllection">
      <a href="#!" class="collection-item"
          v-for="gameName in gameNames"
          @click="selected(gameName)"
          :class="{active:activeName==gameName}"
      >{{gameName}}</a>
  </div>
</template>

<script>
    export default{
        data(){
            return {
                gameNames:['1','2','3'],
                activeName:''
            }
        },
        methods:{
            selected:function(gameName){
                this.activeName=gameName;
                console.log(this.activeName);
            }
        }
    }

</script>

<style>
.active{
  color: white;
}

</style>

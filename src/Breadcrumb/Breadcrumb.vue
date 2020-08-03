<template>
  <div class="main">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: item.url }" v-for="(item,index) in Breaditem" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props:['Breaditem'],
  data(){
    return{
    }
  } 
}
</script>

<style scoped>
.main{
  margin: 6px;
}
</style>
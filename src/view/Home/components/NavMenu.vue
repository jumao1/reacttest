<template>
  <div>
    <h1 id="logo">图书借阅系统</h1>
    <el-row>
      <el-col>
        <el-menu default-active="books">
          <el-menu-item index="books" @click="jump('books')">
            <i class="el-icon-reading"></i>
            <span slot="title">书籍管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="test" @click="jump('test')">
            <i class="el-icon-menu"></i>
            <span slot="title">轮播管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="students" @click="jump('students')">
            <i class="el-icon-school"></i>
            <span slot="title">学生管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
		  <el-menu-item index="read" @click="jump('read')">
		    <i class="el-icon-notebook-1"></i>
		    <span slot="title">借阅数据</span>
		    <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
		  </el-menu-item>
          <el-menu-item index="classify" @click="jump('classify')">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">分类管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
					<el-menu-item index="borrowDetail" @click="jump('borrowDetail')">
					  <i class="el-icon-s-custom"></i>
					  <span slot="title">借阅详情</span>
					  <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
					</el-menu-item>
          <el-menu-item index="personal" @click="jump('personal')">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人中心</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name:"navMenu",
    data(){
      return{}
    },
    methods:{
      jump(params){
        //跳转地址
        console.log(params)
        this.$router.push({path:'/'+params})
      }
    }

  }
</script>

<style>
</style>


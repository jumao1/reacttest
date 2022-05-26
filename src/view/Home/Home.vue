<template>
  <div id="home">
    <el-container>
      <el-aside width="200px">
        <NavMenu></NavMenu>
      </el-aside>
      <el-container>
        <el-header>
          <LoginOut></LoginOut>
        </el-header>
        <el-main>
          <router-view></router-view>
					
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from "./components/NavMenu.vue";
import LoginOut from "./components/LoginOut.vue";
export default {
  name: "Home",
  components: {
    NavMenu,
    LoginOut,
  },
  
 
};
</script>
<style scoped>
	
	
	
</style>

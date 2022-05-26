<template>
  <div class="logo">

      <el-avatar  :src="circleUrl"></el-avatar>

    <!-- <el-avatar icon="el-icon-user-solid" :size="35"></el-avatar> -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        admin<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown"  >
        <el-dropdown-item command="test">个人信息</el-dropdown-item>
        <el-dropdown-item command="test1">安全中心</el-dropdown-item>
        <el-dropdown-item command="test2">退出</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default{
    data(){
     return{
        circleUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
     }
    },
    methods:{
		handleCommand(cmditem) {
		      if (!cmditem) {
		        this.$message("菜单选项缺少command属性");
		        return;
		      }
		      switch (cmditem) {
		        case "test":
		          this.test();
		          break;
		        case "test1":
		          this.test1();
		          break;
		        case "test2":
		          this.test2();
		          break;
		        
		      }
		    },
     test(){
		 this.$router.push('/students')
	 },
	 test1(){
		 this.$router.push('/personal')
	 },
	 test2(){
		 this.$router.push('/')
	 }
    }
  }
</script>

<style scoped>

  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;

    }


    .logo{
    display: flex;
    justify-content: space-around;
    /* flex-wrap: nowrap; */
    flex-flow: row nowrap;
    width: 100px;
    align-content: space-around;
    }
</style>


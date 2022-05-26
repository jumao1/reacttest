<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

.el-header {
        background-color: #44cef6;
        color: #333;
        text-align: center;
        line-height: 60px;
        display: flex;
        justify-content: flex-end;
      }

      .el-aside {
        background-color: #70f3ff;
        color: #333;
        text-align: center;
      }

      .el-aside .el-menu span{
        display: inline-block;
        width: 100px;
        text-align: left;

      }

      .el-main {
        background-color:#3eede7 ;
        color: #333;
        /* text-align: center; */
        /* line-height: 160px; */
      }

      .el-container {
        width: 100%;
        height: 100vh;
      }
      #logo{
        height: 60px;
        line-height: 60px;
      }
</style>

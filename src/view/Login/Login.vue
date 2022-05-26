<template>
	<div class="login"   v-loading="loading"
    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
	   <video class="f"  id="bgvid" playsinline="" autoplay muted loop="">
	        <source src="../../assets/loginBg.mp4" type="video/mp4">
	    </video>

		<main>
			<!-- <img src="../../assets/logo.png" > -->
			<h3>图书借阅后台管理系统</h3>
			<el-input prefix-icon="el-icon-user-solid" type="text" v-model="username" placeholder="请输入用户名"/>
			<el-input prefix-icon="el-icon-lock" type="text" placeholder="请输入密码" v-model="userpass" show-password></el-input>

			<!-- <el-input prefix-icon="el-icon-lock" type="text" v-model="userpass" placeholder="请输入密码"/> -->
			 <el-button type="primary" @click="login">登录</el-button>
			   <el-link type="primary" @click="register" :underline="false" style="float: right;margin:15px 0;color:#e4c6d0;font-size:15px ;">立即注册</el-link>
			 <!-- <el-button type="primary" style="float: right;" @click="register">注册</el-button> -->
			 <!-- <el-button type="primary" @click="login">忘记密码</el-button> -->
		</main>
	</div>
</template>

<script>
	 
	export default{
		name:"Login",
		components:{
			
		},
		data(){
			return{
				input:"",
				username:"",
				userpass:"",
				loading:false,
				// src:"../../assets/logo.png"
			}
		},
		created() {
			// 拦截登录状态 更好的方式 路由守卫 axios拦截器
			// var manager =JSON.parse(sessionStorage.getItem("manager"))
			// if(manager.memberName){
			//   this.$router.push({path:'/home'})
			// }
			
		},
		methods:{
			login(){
				var self = this;
				self.loading = true;
				if(self.username==""||self.userpass==""){
					self.$message({
						duration:1500,
						message:'用户名或密码不能为空',
						type:'error',
						onClose(){
							self.loading=false
						}
					})
				}else{
					self.$http.post(`/api/login/User/${self.username}/${self.userpass}`,{
						"member_Name":self.username,
						"member_Pass":self.userpass,
					}
						
					).then(res=>{
						console.log(res.data.data.User)
						if(res.data.data.User==null){
							self.$message({
								duration:1500,
								message:'用户名或密码不正确',
								type:'error',
								onClose(){
									self.loading=false
								}
							})
						}else{
							self.$message({
								duration:1500,
								message:"登录成功",
								type:'success',
								onClose(){
									self.loading=false,
									//跳转成功之前吧数据存储起来
									//session localStorage sessionStorage cookie区别
									// sessionStorage.setItem("manager",JSON.stringify(res.data.data))
									self.$router.push({path:'/home'})
								}
							})
						}
					})
				}
			},
			register(){
				var self = this;
				self.$router.push({path:'/register'})
			}
		}
			
	}
</script>

<style scoped>
	.login{
	  width: 100vw;
	  height: 100vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  /* background: url(../../assets/images/logoo.png) no-repeat 0 0; */
	  background-size: 100% 100%;
	}
	.login main{
	  width: 420px;
		/* border: 1px solid red; */
	  margin: 0 auto;
	  box-sizing: border-box;
	  padding: 20px;
	  background: rgba(255,255,255,0.7);
	  border-radius: 5px;
	}
	.login h3{
	  margin-bottom: 20px;
	  border: green;
	  font-size: 30px;
	  text-align: center;
	
	}
	.el-input{
		margin: 15px 0;
		/* padding: 0 10px; */
	}
	/* .login input{
	  width: 100%;
	  height: 33px;
	  margin: 15px 0;
	  padding: 0 10px;
	  box-sizing: border-box;
	  border: green 1px solid;
	  border-radius: 5px;
	} */
	.login button{
		/* width:100%; */
	  width: 50%;
	  border: 0 none;
	  margin-bottom: 20px;
	  background-color: #e4c6d0;
	}
	 *{margin:0 auto;padding:0 auto;}
	  .f{
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    min-width: 100%;
	    min-height: 100%;
	    width: auto;
	    height: auto;
	    z-index: -9999;
	    -webkit-transform: translateX(-50%) translateY(-50%);
	    transform: translateX(-50%) translateY(-50%);
	    -webkit-transition: 1s opacity;
	    transition: 1s opacity;
		background-color:skyblue;
		
	
	  }
	   .v{
	     position: fixed;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    z-index: -10000; 
		background-color:skyblue;
	
	  
	
	   }
	  .v:before{
	    content: "";
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    display: block;
	    z-index: -1000;
	    top: 0;
	    left: 0;
	    background: rgba(90,20,10,.2);
	   
	   
	   }
	
</style>

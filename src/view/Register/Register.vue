<template>
	<!-- <div id="register">
		欢迎来到注册页面
	</div> -->

	<div class="register" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<main>
			<h3>Welcome to register</h3>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
				class="demo-ruleForm">
				<el-form-item label="用户名" prop="name">
					<el-input  type="text" v-model="userName" />
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="register">提交</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
		</main>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name:'',
					pass: '',
					checkPass: '',
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				userName: '',
				
				loading: false,
			}
		},
		methods: {
			register() {
				var self = this;
				self.loading = true;
				if (self.userName==""||self.ruleForm.pass=="") {
					this.$message({
						duration: 1000,
						message: '用户名或密码不能为空',
						type: 'error',
						onClose() {
							self.loading = false
						}
					})
				} else {
					self.$http.post('/api/login/register', {
						"member_name": self.userName,
						"member_pass": self.ruleForm.pass
					}).then(res => {
						console.log(res.data.data.User)
						if (res.data.data.User!=null) {
							this.$message({
								message: "抱歉,该用户已存在",
								type: "error",
								onClose: function() {
									self.loading = false;
									
								}
							})
						} else {
							this.$message({
								message: "注册成功，即将跳转登录页面",
								type: 'success',
								onClose: function() {
									self.loading = false;
									self.$router.push({
										path: '/'
									});

								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style scope>
	.register {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: url(../../assets/images/book3.jpg) no-repeat 0 0;
		background-size: 100% 100%;
	}

	.register main {
		/*  width: 420px;
	  margin: 0 auto;
	  box-sizing: border-box;
	  padding: 20px;
	  background: ragb(255,255,255,0.7);
	  border-radius: 5px; */

		display: flex;
		flex-direction: column;
		width: 450px;
		padding: 20px;
		box-sizing: border-box;
		height: 350px;
		justify-content: center;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.7);
	}

	.register h3 {
		margin-bottom: 20px;
		border: green;
		font-size: 30px;
		text-align: center;

	}

	.register input {
		width: 100%;
		height: 33px;
		margin: 15px 0;
		padding: 0 10px;
		box-sizing: border-box;
		border: green 1px solid;
		border-radius: 5px;
	}

	.register button {
		width: 100%;

		border: 0 none;
		margin-bottom: 20px;
		background-color: #e4c6d0;
	}
	
	.el-form-item{
		margin-bottom: 15px !important;
		
	}
</style>

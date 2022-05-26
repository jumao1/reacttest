<template>
	<div>
		<el-dialog title="借阅卡" :visible.sync="borrowBooksVisible" width="30%" :destroy-on-close="true"
			:before-close="closeAddBooks">
			<el-form :model="manager" ref="borrowBooks" label-width="100px" v-loading="false">
				<el-form-item label="书名" prop="bookName" :rules="[
	          { required: true, message: '请输入书籍名字'},
	
	        ]">
					<el-input type="text" v-model="manager.bookName" placeholder="请输入书籍名字"></el-input>
				</el-form-item>
				<el-form-item label="书籍编号" prop="bookID" :rules="[
		      { required: true, message: '请输入书籍编号'},
		
		    ]">
					<el-input type="text" v-model="manager.bookID" placeholder="请输入书籍编号"></el-input>
				</el-form-item>
				  <div class="block" >
					  <el-form-item label="借书时间" prop="borrowTime">
						  <el-date-picker
						    v-model="manager.borrowTime"
						    type="datetime"
						    placeholder="选择日期时间"
						    default-time="12:00:00">
						  </el-date-picker>
					  </el-form-item>
				   </div>			   
				   <div class="block">
				      <el-form-item label="还书时间" prop="returnTime">
						  <el-date-picker
						    v-model="manager.returnTime"
						    type="datetime"
						    placeholder="选择日期时间"
						   >
						  </el-date-picker>
					  </el-form-item>
				     
				    </div>
				<!-- <el-form-item label="还书时间" prop="returnTime" :rules="[
				  { required: true, message: '请输入还书时间'},
						
				]">
					<el-input type="text" v-model="manager.returnTime" placeholder="请输入还书时间"></el-input>
				</el-form-item> -->
				<el-form-item label="学生姓名" prop="stuName" :rules="[
		      { required: true, message: '请输入学生姓名'},
		
		    ]">
					<el-input type="text" v-model="manager.stuName" placeholder="请输入学生姓名"></el-input>
				</el-form-item>

				<el-form-item label="手机号" prop="stuPhone" :rules="[
					  { required: true, message: '请输入手机号'},{validator:checkPhone,trigger:'blur'}						
					]">
					<el-input type="text" v-model="manager.stuPhone" placeholder="请输入手机号"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddBooks">取 消</el-button>
				<el-button type="primary" @click="borrowBooks('borrowBooks')">添加</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "",
		props: ["borrowBooksVisible"], //子组件接收
		data() {
			return {
				manager: {
					bookID: "",
					bookName: "",
					borrowTime: "",
					stuName: "",
					stuID: "",
					
					returnTime: "",
					detail: ""
				},
				// options: [{
				// 		value: "1",
				// 		label: "未逾期"
				// 	},
				// 	{
				// 		value: "2",
				// 		label: "逾期"
				// 	},
				// ]
			}
		},
		methods: {
			closeAddBooks() {
				console.log(this) //this指向当前组件 即AddBooks
				this.$parent.borrowBooksVisible = false
			},
			borrowBooks(params) { //确定
				var self = this
				this.$refs[params].validate((valid) => {
					
					if (valid) {
						console.log(self.manager)
						// self.$http.post('/api/vi/adminAdd')
						self.$http({
							url: `/api/Stu/addStu`,
							method: 'post',							
							data: {
								"book_Name": self.manager.bookName,
								"book_ID": self.manager.bookID,
								"borrow_time": self.manager.borrowTime,
								"return_time": self.manager.returnTime,							
								"stu_Phone": self.manager.stuPhone,
								"stu_Name": self.manager.stuName
							}
						}).then(function(res) {
							console.log(res)
							if (res.data.code === 20001) {
								self.$message({
									message: 添加失败,
									type: 'error',
								});
							}
							if (res.data.code === 20000) {
								self.$message({
									message: '恭喜你，借书成功',
									type: 'success',
									onClose: function() {
										//添加成功后调用关闭方法 关闭窗口
										self.closeAddBooks()
										self.$parent.getBorrowList(1)
									}
								});
							}
						})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// checkPhone(rule,value,callback){
			// 	if(!(/^1[34578]\d{9}$/.test(value))){
			// 		return callback(new Error('手机号码格式不正确'))
			// 	}
			// 	return callback()
			// }
		}
	}
</script>

<style>
</style>

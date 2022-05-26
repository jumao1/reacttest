<template>
	<div>
		 <el-dialog title="书籍详情" :visible.sync="detailBooksVisible" @open="opendEnd" width="30%" :destroy-on-close="true"
			:before-close="closeEditorBooks">
			<!-- el-form label-width="80px">
	    <el-form-item label="活动名称">
	      <el-input></el-input>
	    </el-form-item>
	  </el-form> -->
	  
			<el-form :model="manager" ref="addBooks" label-width="100px">
				<el-form-item label="书名" prop="bookName">
					<el-input type="text" v-model="manager.bookName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="详情" prop="detail">
					
				</el-form-item>
				<el-form-item label="数量" prop="bookCounts">
					<el-input type="text" v-model="manager.bookCounts" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="作者" prop="authorName">
					<el-input type="text" v-model="manager.authorName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-select v-model="manager.state" placeholder="">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				
				<el-button type="primary" @click="addBooks('addBooks')">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "",
		props: ["detailBooksVisible","editorObj"], //子组件接收
		data() {
			return {
				manager: {
					bookName: "",
					bookCounts: "",
					authorName:"",
					state: "",
					detail: "",
					id:""
					
				},
				options: [{
						value: "1",
						label: "未逾期"
					},
					{
						value: "2",
						label: "逾期"
					},
				]
			}
		},
		methods: {
			closeEditorBooks() {
				console.log(this) //this指向当前组件 即AddBooks
				this.$parent.editorBooksVisible = false
			},
			opendEnd() {
			
			//在这穿id 不穿id怎么改？？？？？
				// this.manager.id = this.$props.editorObj.book_ID,
			 // this.manager.bookName = this.$props.editorObj.book_Name,
			 // this.manager.bookCounts = this.$props.editorObj.book_Counts,
			 // this.manager.detail = this.$props.editorObj.detail,
			 // this.manager.authorName = this.$props.editorObj.author_Name
			 
			},
			addBooks(params) { //确定
				var self = this
				this.$refs[params].validate((valid) => {
					// var manager = JSON.parse(sessionStorage.getItem("manager"))
					if (valid) {
						// self.$http.post('/api/vi/adminAdd')
						self.$http({
							method: 'post',
							url: `/api/book/updateBook`,
							// headers:{
							//   token:manager.token
							// },
							data: {
								"book_Name": self.manager.bookName,
								"book_Counts": self.manager.bookCounts,
								"detail": self.manager.detail,
								"state": self.manager.state,
								"author_Name": self.manager.authorName,
								"book_ID":self.manager.id
							}
						}).then(function(res) {
							console.log(res)
							if (res.data.code === 20001) {
								self.$message({
									message: "修改失败",
									type: 'error',
	
								});
							}
							if (res.data.code === 20000) {
								self.$message({
									message: '恭喜你，修改成功',
									type: 'success',
									onClose: function() {
										//添加成功后调用关闭方法 关闭窗口
										self.closeEditorBooks()
										self.$parent.getBooksList(1)
									}
								});
							}
						})
	
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style>
</style>

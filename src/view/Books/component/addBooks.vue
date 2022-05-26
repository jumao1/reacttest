<template>
	<div>
		<el-dialog title="添加书籍" :visible.sync="addBooksVisible" width="30%" :destroy-on-close="true"
			:before-close="closeAddBooks">
			<el-form :model="manager" ref="addBooks" label-width="100px" v-loading="false">
				<el-form-item label="书名" prop="bookName" :rules="[
              { required: true, message: '请输入书籍名字'},
            ]">
					<el-input type="text" v-model="manager.bookName" placeholder="请输入书籍名字"></el-input>
				</el-form-item>
				<!-- <el-form-item label="书籍编号" prop="bookID" :rules="[
				  { required: true, message: '请输入书籍编号'},				
				]">
					<el-input type="text" v-model="manager.bookID" placeholder="请输入书籍编号"></el-input>
				</el-form-item> -->
				<el-form-item label="详情" prop="detail" :rules="[
		      { required: true, message: '请输入书籍详情'},
		
		    ]">
					<el-input type="text" v-model="manager.detail" placeholder="请输入书籍详情"></el-input>
				</el-form-item>

				<el-form-item label="作者" prop="authorName" :rules="[
		      { required: true, message: '请输入作者名字'},
		
		    ]">
					<el-input type="text" v-model="manager.authorName" placeholder="请输入作者名字"></el-input>
				</el-form-item>

				<el-form-item label="书籍类别" prop="bookClassify" :rules="[
           { required: true, message: '请选择书籍类别'},
            ]">
					<el-select v-model="manager.bookClassify" placeholder="请选择书籍类别">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="书籍图片" prop="bookImg">
					<el-upload class="avatar-uploader" action="http://127.0.0.1:8070/file/upload"
						:show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="manager.bookImg" :src="manager.bookImg" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>


			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddBooks">取 消</el-button>
				<el-button type="primary" @click="addBooks('addBooks')">添加</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "",
		props: ["addBooksVisible"], //子组件接收
		data() {
			return {
				manager: {
					bookID: "",
					bookName: "",
					bookCounts: "",
					bookClassify: "",
					bookImg: "",
					authorName: "",
					detail: ""
				},
				options: [{
						value: "1",
						label: "文学类"
					},
					{
						value: "2",
						label: "历史类"
					},
					{
						value: "3",
						label: "天文学"
					},
				]
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.manager.bookImg = URL.createObjectURL(file.raw);
			},
			

			closeAddBooks() {
				console.log(this) //this指向当前组件 即AddBooks
				this.$parent.addBooksVisible = false
			},
			addBooks(params) { //确定
				var self = this
				this.$refs[params].validate((valid) => {
					// var manager = JSON.parse(sessionStorage.getItem("manager"))
					if (valid) {
						// self.$http.post('/api/vi/adminAdd')
						self.$http({
							method: 'post',
							url: `/api/book/addBook`,

							data: {
								"book_Name": self.manager.bookName,
								"book_ID": self.manager.bookID,
								"book_Counts": self.manager.bookCounts,
								"detail": self.manager.detail,
								"book_Classify": self.manager.bookClassify,
								"book_img": self.manager.bookImg,
								"author_Name": self.manager.authorName
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
									message: '恭喜你，添加成功',
									type: 'success',
									onClose: function() {
										//添加成功后调用关闭方法 关闭窗口
										self.closeAddBooks()
										// self.$parent.getManagerList(1)
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
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>

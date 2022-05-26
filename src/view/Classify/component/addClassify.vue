<template>
	<div>
		<el-dialog title="添加类别" :visible.sync="addClassifyVisible" width="30%" :destroy-on-close="true"
			:before-close="closeAddClassify">
			<el-form :model="manager" ref="addClassify" label-width="100px" v-loading="false">
				<el-form-item label="类别名称" prop="classifyName" :rules="[
              { required: true, message: '请输入书籍名字'},
            ]">
					<el-input type="text" v-model="manager.classifyName" placeholder="请输入书籍名字"></el-input>
				</el-form-item>
				<!-- <el-form-item label="类别编号" prop="classifyID" :rules="[
				  { required: true, message: '请输入类别编号'},				
				]">
					<el-input type="text" v-model="manager.classifyID" placeholder="请输入书籍编号"></el-input>
				</el-form-item> -->
				<el-form-item label="类别图片" prop="classifyImage">
					<el-upload class="avatar-uploader" action="http://127.0.0.1:8070/file/upload"
						:show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="manager.classifyImage" :src="manager.classifyImage" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAddClassify">取 消</el-button>
				<el-button type="primary" @click="addClassify('addClassify')">添加</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "",
		props: ["addClassifyVisible"], //子组件接收
		data() {
			return {
				manager: {
					ClassifyID: "",
					ClassifyName:"",
					ClassifyImage: "",
				},
				
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				console.log(res)
				this.manager.classifyImage = URL.createObjectURL(file.raw);
				console.log(this.manager.classifyImage)
			},
			closeAddClassify() {
				console.log(this) //this指向当前组件 即AddBooks
				this.$parent.addClassifyVisible = false
			},
			addClassify(params) { //确定
				var self = this
				this.$refs[params].validate((valid) => {				
					if (valid) {					
						self.$http({						
							method: 'post',
							url: `/api/classify/addClassify`,
							data: {
								"classify_Name": self.manager.classifyName,
								// "classify_ID": self.manager.classifyID,
								"classify_image": self.manager.classifyImage,							
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
										self.closeAddClassify()
										// self.$parent.getManagerList(1)
										self.$parent.getClassifyList(1)
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

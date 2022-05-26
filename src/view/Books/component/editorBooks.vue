<template>
	<div>
		<el-dialog title="编辑书籍" :visible.sync="editorBooksVisible" @open="opendEnd" width="30%" :destroy-on-close="true"
			:before-close="closeEditorBooks">
			<!-- el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input></el-input>
        </el-form-item>
      </el-form> -->

			<el-form :model="manager" ref="addBooks" label-width="100px">
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
				<el-form-item label="详情" prop="detail" :rules="[
		      { required: true, message: '请输入书籍详情'},
		
		    ]">
					<el-input type="text" v-model="manager.detail" placeholder="请输入书籍详情"></el-input>
				</el-form-item>
				<el-form-item label="数量" prop="bookCounts" :rules="[
              { required: true, message: '请输入书籍数量'},

            ]">
					<el-input type="text" v-model="manager.bookCounts" placeholder="请输入书籍数量"></el-input>
				</el-form-item>
				<el-form-item label="作者" prop="authorName" :rules="[
		      { required: true, message: '请输入作者名字'},
		
		    ]">
					<el-input type="text" v-model="manager.authorName" placeholder="请输入作者名字"></el-input>
				</el-form-item>
				
				<el-form-item label="书籍类别"  :rules="[
           { required: true, message: '请选择书籍类别'},
            ]">
					<el-select v-model="manager.bookClassify" placeholder="请选择书籍类别">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeEditorBooks">取 消</el-button>
				<el-button type="primary" @click="addBooks('addBooks')">修改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "",
		props: ["editorBooksVisible", "editorObj"], //子组件接收
		data() {
			return {
				manager: {
					bookID: "",
					bookName: "",
					bookCounts: "",
					authorName: "",
					bookClassify:"",
					detail: "",
					bookImg:""

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
			closeEditorBooks() {
				console.log(this) //this指向当前组件 即AddBooks
				this.$parent.editorBooksVisible = false
			},
			opendEnd() {

				//在这穿id 不穿id怎么改？？？？？
				    this.manager.bookID = this.$props.editorObj.book_ID,
					this.manager.bookName = this.$props.editorObj.book_Name,
					this.manager.bookClassify = this.$props.editorObj.book_Classify,
					this.manager.bookCounts = this.$props.editorObj.book_Counts,
					this.manager.detail = this.$props.editorObj.detail,
					
					this.manager.authorName = this.$props.editorObj.author_Name

			},
			addBooks(params) { //确定
			console.log(this.manager)
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
								"book_Classify":self.manager.bookClassify,
								"author_Name": self.manager.authorName,
								"book_ID": self.manager.bookID
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

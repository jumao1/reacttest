<template>
	<!-- <div>欢迎来到书籍分类</div> -->
	<div>
		<el-button type="primary" @click="addClassifyShow" style="float: left;margin-right: 10px;" icon="el-icon-circle-plus">添加</el-button>
		<el-form :inline="true" :model="Classify" class="demo-form-inline" >
		  <el-form-item label="类别名称" >
		    <el-input v-model="Classify.classify_Name" placeholder="请输入要查找的类别"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit(Classify.classify_Name)" icon="el-icon-search">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table :data="ClassifyList">
		   <el-table-column prop="classify_ID" label="分类编号" width="250" >
		        </el-table-column>
		        <el-table-column prop="classify_Name" label="类别名称" width="250">
		        </el-table-column>
			<el-table-column prop="classify_image" label="类别图片" width="250">
				<template v-slot="scope">
					<img :src="scope.row.classify_image" width="120">
				</template>
			</el-table-column>
			
		        <el-table-column label="操作" width="180">
		    <template v-slot="scope">
		      <el-button type="primary" size="mini" @click="openEditor(scope.row)">编辑</el-button>
		      <el-popconfirm confirm-button-text='确定' cancel-button-text='不删' icon="el-icon-info" icon-color="red"
		        title="确定删除吗？" @confirm="delClassify(scope.row.classify_ID)">
		        <el-button slot="reference" type="danger" size="mini">删除</el-button>
		      </el-popconfirm>
		    </template>
		  </el-table-column>
		</el-table>
		<addClassify :addClassifyVisible="addClassifyVisible"></addClassify>
	</div>
</template>

<script>
	import addClassify from './component/addClassify.vue'
	export default{
		components:{
			addClassify
		},
		mounted() {
			this.getClassifyList(1)
		},
		data(){
			return{
				Classify:{},
				ClassifyList:[],
				classify:{
					classify_Name:"",
				},
				addClassifyVisible:false,
			}
		},
		
		methods:{
			onSubmit(classify_Name){
				console.log(classify_Name)
				this.$http.get(`/api/classify/queryByName/${classify_Name}`).then((res)=>{
					console.log(res.data.data)
					if(res.data.code===20000){
						this.ClassifyList = res.data.data.list
						this.$message({
							message:"查询成功",
							type:'success',
							duration:1000
						})
					}else{
						this.$message({
							message:"无此类别",
							type:'error',
							duration:1000
						})
					}
				})
			},
			addClassifyShow(){
				this.addClassifyVisible = true
			},
			delClassify(classify_ID){
				this.$http.post(`/api/classify/del/${classify_ID}`).then(res=>{
					if(res.data.code===20000){
						this.$message({
							message:"删除成功",
							type:"success",
							duration:1000,
							onClose:()=>{
								this.getClassifyList(1)
							}
						})
					}else{
						this.$message({
							message:"删除失败",
							type:"error",
							duration:1000
						})
					}
				},function(err){})
			},
			getClassifyList(){
				var self = this;
				self.loading = true
				self.$http.get('/api/classify/allClassify',{
					
				}).then(res=>{
					console.log(res)
					self.ClassifyList = res.data.data.list
					self.loading = false
				},function(err){
					self.loading = false
				})
			}
		}
		
	}
</script>

<style scope>
	.el-input-group {
	  width: 40%;
	}
</style>

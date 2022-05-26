<template>
	<!-- <div>欢迎来到学生借阅管理</div> -->
	<div>
		<el-button type="primary"@click="borrowBooksShow" style="float: left;margin-right: 10px;" icon="el-icon-reading">借书</el-button>
		<el-form :inline="true" :model="Stu" class="demo-form-inline" >
		  <el-form-item label="书籍编号" >
		    <el-input v-model="Stu.book_ID" placeholder="书籍编号"></el-input>
		  </el-form-item>
		 
		  <el-form-item>
		    <el-button type="primary" icon="el-icon-search" @click="onSubmit(Stu.book_ID)">查询</el-button>
			
		  </el-form-item>
		</el-form>
		<el-table :data="BorrowList"  v-infinite-scroll="load" style="overflow:auto">
		   <el-table-column prop="book_ID" label="书籍编号" width="130" >
		        </el-table-column>
		        <el-table-column prop="book_Name" label="书名" width="130">
		        </el-table-column>
				<el-table-column prop="stu_Id" label="学号" width="130">
				</el-table-column>
				<el-table-column prop="stu_Phone" label="手机号" width="130">
				</el-table-column>
			<!-- 	<el-table-column prop="author_Name" label="作者" width="130">
				</el-table-column> -->
				<el-table-column prop="stu_Name" label="学生姓名" width="130">
				</el-table-column>
		        <el-table-column prop="borrow_time" label="借书时间">
		         
		        </el-table-column>
				<el-table-column prop="return_time" label="还书时间">
				 
				</el-table-column>
		        <el-table-column label="操作" width="180">
		    <template v-slot="scope">
		      
		      <el-popconfirm confirm-button-text='归还' cancel-button-text='不删' icon="el-icon-info" icon-color="red"
		        title="确定还书吗？" @confirm="delStudents(scope.row.book_ID)">
		        <el-button slot="reference" type="danger">还书</el-button>
		      </el-popconfirm>
			 <!-- <el-switch
			    v-model="value"
				@change="changeStatus"
			    active-color="#13ce66"
			    inactive-color="#ff4949">
			  </el-switch> -->
		    </template>
		  </el-table-column>
		</el-table>
		<borrow :borrowBooksVisible="borrowBooksVisible"></borrow>
		
	</div>
</template>

<script>
	import borrow from './component/borrow.vue'
	export default{
		components:{
			borrow
		},
		data(){
			return{
				 value: true,
				Stu:{},
				borrowBooksVisible:false,
				stuCount:0,
				BorrowList:[],
				students:{
					stu_Name:"",
					stu_Phone:""
				}
			}
		},
		mounted() {
			this.getBorrowList(1)
		},
		methods:{
			borrowBooksShow(){
				this.borrowBooksVisible=true
			},
			// changeStatus(){
			// 	this.$http.post(`api/Stu/updateStu`).then((res)=>{
			// 		if(res.data.code===20000){
			// 			this.$message({
			// 				message:"还书成功",
			// 				type:"success"
			// 			})
			// 		}else{
			// 			this.$message({
			// 				message:"还书失败",
			// 				type:'error'
			// 			})
			// 		}
			// 	},function(err){})
				
			// },
			getBorrowList(page){
			  var self = this;
				self.loading = true
			  // var manager = JSON.parse(sessionStorage.getItem('manager'));
			  self.$http.get('/api/Stu/allStudents',{
			    // headers:{
			    //   token:manager.token
			    // },
			    
			  }).then(function(res){
			    console.log(res)
			    self.BorrowList = res.data.data.list
			    self.stuCount = res.data.data.length
			    // self.loading = false
			  },function(err){
			    self.loading = false
			  })
			},
			delStudents(book_ID){
				this.$http.post(`api/Stu/del/${book_ID}`).then((res)=>{
					if(res.data.code===20000){
						this.$message({
							message:"删除成功",
							type:"success",
							duration:1000,
							onClose:()=>{
								this.getBorrowList(1)
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
			onSubmit(book_ID){
			  console.log(book_ID)
			  	this.$http.get(`/api/Stu/queryOne/${book_ID}`).then((res)=>{
			  		if(res.data.code===20000){
						this.BorrowList = res.data.data.list
			  			this.$message({
			  				message:"查询成功",
			  				type:'success',
			  				duration:1000,		  				
			  			})
			  		}else{
			  			this.$message({
			  				message:"查询失败",
			  				type:'error',
			  				duration:1000
			  			})
			  		}
			  	},function(err) {})
			  },
			},
		
		
	}
</script>

<style>
</style>

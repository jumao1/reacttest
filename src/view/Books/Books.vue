<template>

  <div >
	 
	<el-button type="primary" icon="el-icon-reading" @click="addBooksShow" style="float: left;margin-right: 10px;">上架</el-button>
	<el-form :inline="true" :model="Book" class="demo-form-inline" >
	  <el-form-item label="书籍编号" >
	    <el-input v-model="Book.book_ID" placeholder="书籍编号"></el-input>
	  </el-form-item>
	 
	  <el-form-item>
	    <el-button type="primary" icon="el-icon-search" @click="onSubmit(Book.book_ID)">查询</el-button>
			

	  </el-form-item>
	</el-form>
    <el-table :data="BooksList"  v-infinite-scroll="load" style="overflow:auto" v-loading="loading"  @row-click="openDialog">
       <el-table-column prop="book_ID" label="书籍编号" width="120" >
            </el-table-column>
            <el-table-column prop="book_Name" label="书名" width="120">
            </el-table-column>
			
			<el-table-column prop="author_Name" label="作者" width="120">
			</el-table-column>
			<el-table-column prop="detail" label="详情" width="120">
				<!-- <template slot-scope="scope">
					<router-link :to="{path:'/test'}"></router-link>
				</template> -->
			</el-table-column>
			<el-table-column  label="类别" width="120">
				<template v-slot="scope"> 
				  <p v-if="scope.row.book_Classify==1">文学类</p>
				  <p v-else-if="scope.row.book_Classify==2">天文学</p>
				  <p v-else-if="scope.row.book_Classify==3">历史类</p>
				</template>
			</el-table-column>
			<el-table-column  label="图片" width="120">
			<template v-slot="scope">
				<img :src="scope.row.book_img"  width="120">
			</template>
			</el-table-column>  
            <el-table-column label="操作" width="270">
        <template v-slot="scope">			
          <el-button type="primary" size="mini" @click="openEditor(scope.row)">编辑</el-button>
					<el-button type="primary" size="mini" @click="openDetail(scope.row)">详情</el-button>
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
            title="确定下架此书吗？"  @confirm="delBooks(scope.row.book_ID)">
            <el-button slot="reference" type="danger" size="mini">下架</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <addBooks :addBooksVisible="addBooksVisible"></addBooks>

	<editorBooks :editorBooksVisible="editorBooksVisible" :editorObj="editorObj"></editorBooks>
    <!-- 父组件向子组件传参 -->
 <el-pagination
   background
   layout="prev, pager, next"
   page-size="6"
   :total="60"
   @current-change="page"
   
 </el-pagination>

  </div>
</template>

<script>
  import addBooks from "./component/addBooks.vue"
  import editorBooks from './component/editorBooks.vue'
  import detail from "./component/detail.vue"
  export default {
	
    components:{
      addBooks,
	  editorBooks
    },
    mounted() {
      this.getBooksList(1)
    },
    data() {
      return {
		Book:{},
        loading:false,
        input:'',
        addBooksVisible:false,
				editorBooksVisible:false,
				editorObj:{},
        books: {
          book_Name: "",
        },
        BooksList: [],
        bookCount:0
      }

    },
    methods:{
		// openDialog() {
		//      this.$router.replace({
		//        path: `/test`,
		       
		//      });
		//    },

		 load () {
			 this.$message.success('加载下一页');
		        this.bookCount +=2
		      },
		onSubmit(book_ID){
			console.log(book_ID)
			this.$http.get(`/api/book/queryOne/${book_ID}`).then((res)=>{
				console.log(res.data.data)
				if(res.data.code===20000){
					this.BooksList = res.data.data.list
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
      addBooksShow(){
        this.addBooksVisible = true;
      },
	  openDetail(){},
	  openEditor(obj){
		  
		  if(obj.book_ID){
				
		  this.editorObj = obj,
			console.log(this.editorObj)
		  this.editorBooksVisible = true
		  }else{
			  this.$message({
				  message:'获取数据失败',
				  type:'error',
				  duration:1000
			  })
		  }
	  },
	  delBooks(book_ID) {
	    // var manager = JSON.parse(sessionStorage.getItem("manager"))
	    this.$http.post(`/api/book/del/${book_ID}`).then((res) => {
	      if (res.data.code === 20000) {
	        this.$message({
	          message: "删除成功",
	          type: "success",
	          duration: 1000,
	          onClose: () => {
	            this.getBooksList(1)
	          }
	        })
	      } else {
	        this.$message({
	          message:"删除失败",
	          type: "error",
	          duration: 1000
	        })
	      }
	    }, function(err) {})
	  },
      getBooksList(page){
        var self = this;
				self.loading = true
        // var manager = JSON.parse(sessionStorage.getItem('manager'));
        self.$http.get('/api/book/allBook',{
          // headers:{
          //   token:manager.token
          // },
          
        }).then(function(res){
          console.log(res)
          self.BooksList = res.data.data.list
          self.bookCount = res.data.data.length
          self.loading = false
        },function(err){
          self.loading = false
        })
      }
    }
  }

</script>

<style scoped>
  .menu {
    width: 100%;
    padding: 10px;
    background: #ffffff;
    box-sizing: border-box;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 2px #ddd solid;
  }
  .el-input-group {
    width: 40%;
  }
</style>

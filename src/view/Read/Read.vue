<template>
	<div>
		<div id="pie" style="width: 600px;height: 300px;"></div>
		<div id="Bar" style="width: 600px;height: 300px;"></div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default{
		components:{},
		data(){
			return{
				ReadList:[],
				CountList:[]
				
			}
		},
		created() {
			var self = this;
			self.$http.get('api/echarts/showType',{
			}).then(res=>{
				console.log(res)
				if(res.data.code===20000){
					let list = []
					for(var i = 0;i<res.data.data.list.length;i++){
						// console.log(res.data.data.list[i])
						list.push({name:res.data.data.list[i].name,value:res.data.data.list[i].id})
					}
					// console.log(list)
					self.ReadList = list
					self.drawPie()
				}
			})
			var self = this;
			self.$http.get('api/echarts/showType',{
			}).then(res=>{
				console.log(res)
				if(res.data.code===20000){
					let list = []
					for(var i = 0;i<res.data.data.list.length;i++){
						// console.log(res.data.data.list[i])
						list.push({name:res.data.data.list[i].name,value:res.data.data.list[i].count})
					}
					// console.log(list)
					self.CountList = list
					self.drawBar()
				}
			})
		},
		methods:{
			drawPie(){
				var self = this;
				var myChart = echarts.init(document.getElementById("pie"));
				myChart.setOption({
				  title: {
				    text: "借阅类别数据统计",
				    subtext: "真实有效",
				    left: "center",
				  },
				  tooltip: {
				    trigger: "item",
				  },
				  legend: {
				    orient: "vertical",
				    left: "left",
				  },
				  series: [
				    {
				      name: "Access From",
				      type: "pie",
				      radius: "50%",
				      data: self.ReadList,
				      emphasis: {
				        itemStyle: {
				          shadowBlur: 10,
				          shadowOffsetX: 0,
				          shadowColor: "rgba(0, 0, 0, 0.5)",
				        },
				      },
				    },
				  ],
				});
			},
			drawBar(){
			  var self = this;
			  var myChart  =echarts.init(document.getElementById('Bar'));
			  // 绘制图表
			      myChart.setOption({
			        title: {
			          text: "每类书籍借阅量",
			        },
			        tooltip: {},
			        xAxis: {
			          data: [
			           
			          
			          ],
			        },
			        yAxis: {},
			        series: [
			          {
			            name: "借阅量",
			            type: "bar",
			            data: self.CountList,
			          },
			        ],
			      });
			    },
		},
		mounted() {
			this.drawPie()
			this.drawBar()
			// this.drawHistogram()
		}
	}
	
</script>

<style>
	
</style>

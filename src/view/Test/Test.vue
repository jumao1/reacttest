<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<img src="../../assets/images/book3.jpg" style="width: 1000px;height: 460px;">
			</div>
			<div class="swiper-slide">
				<img src="../../assets/images/book2.jpg" style="width: 1000px;height: 460px;">
			</div>
			<div class="swiper-slide">
				<img src="../../assets/images/book1.jpg" style="width: 1000px;height: 460px;">
			</div>
		</div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
		
		    <div class="swiper-pagination"></div>


	</div>
</template>
<script>
	import Swiper from "swiper"
	
	import 'swiper/css/swiper.min.css'
	export default{
		mounted() {
			new Swiper('.swiper-container',{
				loop:true,
				 pagination: {
				      el: '.swiper-pagination',
				    },
			})
		}
	}
		
	    
	  
</script>
<style>
	
	
.swiper-container {
    width: 1000px;
    height: 460px;
}
</style>

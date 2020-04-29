<template>
	<view class="notWork">
		<!-- <img src="../../" alt=""> -->
		<view><image src="../../static/notWork.png" mode=""></image></view>
		<text>咦!咋木有网了呢~</text>
		<view @click="reflesh" class="refleshBtn">刷新</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		methods: {
			reflesh(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="less">
.notWork{
	display: flex;
	flex-direction: column;
	// justify-content: center;
	align-items: center;
	width: 100%;
	image{
		display: block;
		width: 400upx;
		height: 362upx;
		margin: 0 auto;
		margin-top: 200upx;
	}
	text{
		margin-top: 50upx;
		font-size: 12px;
		color: #999;
	}
	.refleshBtn{
		width: 180upx;
		line-height: 40upx;
		border: 1px solid #333;
		font-size: 24upx;
		border-radius: 8upx;
		text-align: center;
		justify-content: center;
		margin-top: 10px;
	}
}
</style>

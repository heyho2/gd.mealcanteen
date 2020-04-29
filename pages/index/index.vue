<template>
	<view class="index">
		<view class="userInfo">
			<view>
				<text class="title">当前账户:</text>
				<text class="name">{{userName}}</text>
				<text class="btn" @tap="setupPwd">修改密码</text>
			</view>
			<view class="cancle" @tap='navigato'>
				<text>退出</text>
			</view>
			
		</view>
		<navigator class="item" url="/pages/booked/booked" hover-class="navigator-hover">
			<image src="../../static/booked.png"></image>
			已预订餐品
		</navigator>
		<view class="item scancode" @click="select">
			<image class="phoneIcon" src="../../static/veriy.png"></image>
			<text>扫码验证</text>
		</view>
		<navigator class="item" url="/pages/uphold/uphold">
			<image class="phoneIcon" src="../../static/maintain.png"></image>
			菜品维护
		</navigator>
		<!-- <view>{{ textNasd }}</view> -->
	</view>
</template>

<script>
import auth from '../../common/auth.js';
export default {
	data() {
		return {
			textNasd: null,
			userName: ''
		};
	},
	onShow(){
		this.userName = uni.getStorageSync('userName')
		auth.getToken()
		uni.getNetworkType({
			success: function(res) {
				console.log(res.networkType);
				if (res.networkType == 'none') {
					uni.reLaunch({
						url: '/pages/notNetwork/notNetwork'
					});
				}
			}
		});
		// console.log(this.userName);
		if(!this.userName){
			uni.redirectTo({
				url: '/pages/login/login'
			});
		}
	},
	onLoad() {
		// this.userName = uni.getStorageSync('userName')
	},
	onReachBottom() {},
	onPullDownRefresh() {},
	methods: {
		select() {
			let t = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log(res);
					uni.navigateTo({
						url: '/pages/veriy/index?id=' + res.result
					});
				},
				fail: function(err) {
					console.log(err);
				}
			});
		},
		navigato(){
			uni.clearStorageSync();
			uni.redirectTo({
				url: '/pages/login/login'
			});
		},
		setupPwd(){
			uni.navigateTo({
				url: '/pages/setPwd/setPwd'
			});
		}
	}
};
</script>

<style lang="less">
.index {
	flex: 1;
	width: 750upx;
	height: 100%;
	/* min-height: 100vh; */
	flex-direction: column;
	justify-content: center;
	// align-items: center;
	padding: 0 20upx;
}
.userInfo{
	margin-top: 30upx;
	padding: 0 10upx;
	justify-content: space-between;
	view{
		// flex: 1;
	}
	text{
		font-size: 28upx;
		&.title{
			color: #999;
			margin-right: 20upx;
		}
		&.name{
			color: #333;
			margin-right: 10upx;
		}
		&.btn{
			font-size: 20upx;
			width: 100upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			border: 1px solid #FFC843;
			color: #FFC843;
			border-radius: 5upx;
		}
		
	}
	.cancle{
		// text-align: right;
		align-items: flex-end;
		text{
			color: #333;
		}
		// align-self: flex-end;
	}
}
.index .item {
	position: relative;
	width: 100%;
	height: 350upx;
	background-color: #fff;
	margin-top: 30upx;
	text-align: center;
	font-size: 36upx;
	font-weight: 600;
	color: #333;
	line-height: 350upx;
	border-radius: 15upx;
	text-indent: 140upx;
	box-shadow: 0 0 10upx 1px rgba(153, 153, 153, 0.35);
}

.index .item image {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 200upx;
	display: inline-block;
	width: 106upx;
	height: 106upx;
	vertical-align: middle;
	margin-right: 44upx;
}
.index .item view {
	text-align: center;
	direction: inline-block;
}
.index .item image.phoneIcon {
	width: 80upx;
	height: 140upx;
}
.index .item text {
	width: 100%;
	text-align: center;
}
</style>

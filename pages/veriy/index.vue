<template>
	<view class="veriy">
		<view class="result" v-if="isSuccess">
			<view><image src="../../static/veriySuc.png" mode=""></image></view>
			<view><text>验证成功</text></view>
		</view>
		<view class="info" v-if="isSuccess">
			<text class="title">订单详情</text>
			<view class="list">
				<view class="item" v-for="(df, index) of form.dishesDetail" :key="index">
					<text class="name">{{ df.dishesName }}</text>
					<text class="count">X{{ df.quantity }}</text>
					<text class="price">￥{{ df.unitPrice }}</text>
				</view>
			</view>
			<text class="total">
				<text>共计</text>
				<text class="totalPrice">￥{{ form.totalPrice }}</text>
			</text>
		</view>
		<view v-if="!isSuccess" class="completed">
			<image src="../../static/Completed.png"></image>
			<text>{{errorMsg}}</text>
		</view>
		<view class="btn" @click="select">{{ isSuccess ? '确认' : '返回' }}</view>
	</view>
</template>

<script>
import auth from '../../common/auth.js';
export default {
	data() {
		return {
			id: null,
			form: {},
			isSuccess: true,
			errorMsg: ''
		};
	},
	onShow() {

	},
	onLoad(option) {
		this.form = {}
		this.id = option.id;
		this.$api
			.ScanToGetDisheAsync({
				OrderGuid: option.id
			})
			.then(res => {
				if (res.code == 0) {
					res.data.totalPrice = res.data.totalPrice.toFixed(2);
					res.data.dishesDetail.forEach(item => {
						item.unitPrice = item.unitPrice.toFixed(2);
					});
					this.form = res.data;
					this.isSuccess = true;
				} else {
					this.form = {}
					this.isSuccess = false;
					this.errorMsg = res.message
				}
			})
			.catch(err => {});
	},
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
	}
};
</script>

<style lang="less">
.veriy {
	width: 750upx;
	flex-direction: column;
	// background-color: #fff;
	.btn{
		width: 140upx;
		height: 60upx;
		border-radius: 5upx;
		background-color: #FFBF36;
		font-size: 28upx;
		color: #333;
		text-align: center;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		margin-top: 90upx;
	}
	.completed {
		width: 100%;
		flex-direction: column;
		align-items: center;
		image {
			width: 106upx;
			height: 106upx;
			margin-top: 200upx;
		}
		text {
			margin-top: 50upx;
			font-size: 30upx;
			color: #FF2F2F;
		}
	}
	.result {
		width: 100%;
		height: 350upx;
		background-color: #fff;
		flex-direction: column;
		margin-top: 10upx;
		image {
			display: block;
			width: 106upx;
			height: 106upx;
			margin: 0 auto;
			margin-top: 80upx;
		}
		text {
			display: block;
			width: 100%;
			text-align: center;
			font-size: 50upx;
			font-weight: 600;
			margin-top: 40upx;
		}
	}
	.info {
		margin-top: 10upx;
		background-color: #fff;
		flex-direction: column;
		.title {
			width: 100%;
			line-height: 88upx;
			font-size: 40upx;
			font-weight: 580;
			color: #333;
			padding: 0 30upx;
		}
		.total {
			text-align: right;
			padding: 0 30upx;
			line-height: 88upx;
			font-size: 40upx;
			font-weight: 580;
			color: #333;
			.totalPrice {
				margin-left: 45upx;
			}
		}
		.list {
			display: block;
			padding: 40upx 30upx 10upx;
			border-bottom: 1px solid #e1e1e1;
			border-top: 1px solid #e1e1e1;
			flex-direction: column;
			.item {
				padding-bottom: 30upx;
				text {
					font-size: 20px;
					color: #666;
					&.name {
						flex: 0.6;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-right: 35upx;
					}
					&.count {
						flex: 0.2;
					}
					&.price {
						flex: 0.2;
						text-align: right;
					}
				}
			}
		}
	}
}
</style>

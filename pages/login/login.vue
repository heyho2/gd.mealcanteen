<template>
	<view class="login">
		<image src="../../static/loginbg.png"></image>
		<view class="loginTitle">
			<text class="text">登录食堂</text>
			<text class="line"></text>
		</view>
		<view class="itemBox">
			<view class="item">
				<view class="image">账号</view>
				<input type="text" v-model="phone" placeholder="请输入账号" class="is-input1" data-val="phone" />
			</view>
			<view class="item pwd">
				<view class="image">密码</view>
				<input type="password" v-model="password" placeholder="请输入登录密码" class="is-input1" data-val="password" />
				<!-- <navigator url="/pages/forgetPwd/forgetPwd" class="forgetPwd">忘记密码</navigator> -->
			</view>
			<view class="item errorInfo">{{ errorText }}</view>
		</view>
		<view class="itemBtn">
			<view class="btnClick">
				<button :loading="loading" @tap="defaultHandlerLogin">{{ loading ? '登录中...' : '登 录' }}</button>
			</view>
		</view>
	</view>
</template>

<script>
import auth from '../../common/auth.js';
import md5 from '../../common/md5.js';
import Validate from '../../common/validate.js';
export default {
	data() {
		return {
			loading: false,
			phone: '',
			password: '',
			errorText: '',
			option: null
		};
	},
	onShow() {
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
	},
	onLoad(option) {
		// console.log(mg5);
		this.option = option;
	},
	watch: {
		phone(v) {
			if (v) {
				this.errorText = '';
			}
		},
		password(v) {
			if (v) {
				this.errorText = '';
			}
		}
	},
	methods: {
		defaultHandlerLogin: function() {
			this.$api
				.SystemTime()
				.then(res => {
					console.log(res.data);
					let thisYear = {
						y: new Date(res.data).getFullYear(),
						m: new Date(res.data).getMonth() + 1,
						d: new Date(res.data).getDate()
					};
					uni.setStorage({
						key: 'thisYear',
						data: thisYear,
						success: function() {}
					});
				})
				.catch(err => {});
			if (!this.checkPhone()) {
				return;
			} else if (!this.checkPwd()) {
				return;
			}
			this.loading = true;
			setTimeout(e => {
				this.loading = false;
			}, 1500);
			this.$api
				.Login({
					userName: this.phone,
					password: md5.hexMD5(this.password).toUpperCase()
				})
				.then(res => {
					if (res.code == 0) {
						uni.setStorage({
							key: 'userName',
							data: this.phone,
							success: function() {}
						});
						// console.log(res);
						auth.setToken(res.data.token);
						if (!this.option) {
							uni.navigateBack({
								delta: 1
							});
						} else {
							uni.navigateTo({
								url: '/pages/index/index'
							});
						}

						uni.showToast({
							icon: 'none',
							title: '登录成功',
							duration: 1500
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		// 验证原密码
		checkPhone() {
			if (Validate.isEmpty(this.phone)) {
				this.errorText = '账号不能为空！';
				return false;
			} else {
				return true;
			}
		},
		checkPwd() {
			if (Validate.isEmpty(this.password)) {
				this.errorText = '密码不能为空！';
				return false;
			} else if (!Validate.length(this.password, 6, 20)) {
				this.errorText = '密码为6-20位';
				return false;
			} else {
				return true;
			}
		}
	}
};
</script>

<style lang="less">
.login {
	position: relative;
	width: 750upx;
	flex-direction: column;
	padding: 0 30upx;
	image{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.loginTitle {
		position: relative;
		margin-top: 200upx;
		// padding-left: 30upx;
		.text {
			position: relative;
			z-index: 10;
			font-size: 36upx;
			color: #333;
			font-weight: 580;
		}
		.line {
			position: absolute;
			left: 1px;
			bottom: 0;
			z-index: 9;
			height: 10upx;
			width: 142upx;
			border-radius: 5upx;
			background-color: #ffc843;
		}
	}
	.itemBox {
		position: relative;
		width: 100%;
		// flex: 1;
		margin: 0 auto;
		flex-direction: column;
		margin-top: 100upx;

		.item {
			position: relative;
			// border-radius: 44upx;
			height: 88upx;
			// background-color: #000;
			margin-bottom: 38upx;
			border-bottom: 1px solid #f1f1f1;
			align-items: center;
			input {
				width: 100%;
				height: 88upx;
				padding-left: 60upx;
				font-size: 14px;
			}
			&.btnClick {
				border: 0;
			}
			.image {
				position: relative;
				width: 120upx;
				height: 100%;
				align-items: center;
				font-size: 28upx;
				// text-align: right;
				justify-content: flex-end;
				color: #333;
				font-weight: 580;
			}
			&.errorInfo {
				position: absolute;
				bottom: 0;
				left: 20upx;
				transform: translateY(50upx);
				border: 0;
				height: 44upx;
				color: #ff3434;
				font-size: 24upx;
			}
		}
	}
	.itemBtn {
		position: relative;
		z-index: 99;
		// padding: 0 30upx;
		margin-top: 80upx;
		.btnClick {
			width: 100%;
			height: 88upx;

			border-radius: 44upx;
			background: linear-gradient(to top, #ffca3c, #ffb932);
			box-shadow: 0 0 10upx 2px #ffca3c;
			border: 0;
			button {
				width: 100%;
				height: 100%;
				line-height: 88upx;
				background-color: transparent;
				color: #333;
				font-size: 28upx;
				border: 0;
				&:after {
					border: 0;
				}
			}
		}
	}
}
</style>

<template>
	<view class="login">
		<image src="../../static/loginbg.png"></image>
				<view class="loginTitle"><text class="text">修改密码</text><text class="line"></text></view>
		<view class="itemBox">
			<view class="item"><view class="image">原密码</view><input type="password" v-model="oldPwd" placeholder="请输入登录密码" class="is-input1" data-val="password" /><view class="icon"></view></view>
			<view class="item"><view class="image">新密码</view><input type="password" v-model="newPwd" placeholder="请输入登录密码" class="is-input1" data-val="password" /><view class="icon"></view></view>
			<view class="item"><view class="image">新密码</view><input type="password" v-model="rePwd" placeholder="请输入登录密码" class="is-input1" data-val="password" /><view class="icon"></view></view>
			<view class="item errorInfo">{{errorText}}</view>
		</view>
		<view class="itemBtn">
			<view class="btnClick">
				<button :loading="loading" @tap="defaultHandlerLogin">{{ loading ? '提交中...' : '提 交' }}</button>
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
			oldPwd: '',
			newPwd: '',
			rePwd: '',
			errorText: ''
		};
	},
	onLoad() {
		console.log(Validate);
	},
	watch: {
		oldPwd(v){
			if(v){
				this.errorText = ''
			}
		},
		newPwd(v){
			if(v){
				this.errorText = ''
			}
		},
		rePwd(v){
			if(v){
				this.errorText = ''
			}
		},
	},
	methods: {
		defaultHandlerLogin: function() {
			if(!this.checkOldPwd()){
				return;
			}else if(!this.checkNewPwd()){
				return;
			}else if(!this.checkRePwd()){
				return;
			}
			this.loading = true;
			
			
			this.$api
				.MealOperatorUpdatePassword(md5.hexMD5(this.newPwd).toUpperCase())
				.then(res => {
					console.log(res);
					this.loading = false;
					// auth.setToken(res.data.token);
					uni.showToast({
						icon: 'none',
						title: '修改成功',
						duration: 2000
					})
				})
				.catch(err => {});
		},
		// 验证原密码
		checkOldPwd(){
			if (Validate.isEmpty(this.oldPwd)) {
				this.errorText = '原密码不能为空！';
				return false;
			} else if(!Validate.length(this.oldPwd,6,20)){
				this.errorText = '原密码为6-20位';
				return false;
			}else{
				return true;
			}
		},
		checkNewPwd() {
			if (Validate.isEmpty(this.newPwd)) {
				this.errorText = '新密码不能为空！';
				return false;
			} else if (!Validate.length(this.newPwd,6,20)) {
				this.errorText = '新密码为6-20位';
				return false;
			} else {
				return true;
			}
		},
		checkRePwd() {
			if (Validate.isEmpty(this.rePwd)) {
				this.errorText = '确认密码不能为空！';
				return false;
			} else if (!Validate.length(this.rePwd,6,20)) {
				this.errorText = '确认密码为6-20位';
				return false;
			} else if (this.rePwd !== this.newPwd) {
				this.errorText = '两次密码输入不一致';
				return false;
			}else {
				return true;
			}
		},
	}
};
</script>

<style lang="less">
.login {
	width: 750upx;
	flex-direction: column;
	// background-color: #fff;
	padding: 0 30upx;
		image{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
		.loginTitle{
		position: relative;
		margin-top: 150upx;
		// padding-left: 30upx;
		.text{
			position: relative;
			z-index: 10;
			font-size: 36upx;
			color: #333;
			font-weight: 580;
		}
		.line{
			position: absolute;
			left: 1px;
			bottom: 0;
			z-index: 9;
			height: 10upx;
			width: 142upx;
			border-radius: 5upx;
			background-color: #FFC843;
		}
	}
	.itemBox {
		position: relative;
		width: 100%;
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
				font-size: 28upx;
			}
			&.btnClick {
				border: 0;
			}
			.image{
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
			&.errorInfo{
				position: absolute;
				bottom: 0;
				left: 20upx;
				transform: translateY(50upx);
				border: 0;
				height: 44upx;
				color: #FF3434;
			font-size: 24upx;
			}
			/* .icon{
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				background-color: #000;
				width: 50upx;
				height: 50upx;
			} */
			
		}
	}
	.itemBtn {
		position: relative;
		z-index: 99;
		// padding: 0 30upx;
		margin-top: 100upx;
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

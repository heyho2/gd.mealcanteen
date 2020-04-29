<template>
	<view class="selectFoodsList">
		<view class="mark"></view>
		<view class="selectContent">
			<text class="title">早餐设置</text>
			<scroll-view class="select-wrapper" scroll-y>
				<view class="selectWrapper">
					<view class="item" v-for="(fl,index) of foodsList" :key="index">
						<checkbox-group @change="checkboxChange(fl)">
							<label class="uni-list-cell uni-list-cell-pd">
								<view><checkbox :checked="fl.isChecked" :value="fl.dishesGuid" color="#ffc843"/></view>
								<view class="name">{{fl.dishesName}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
			</scroll-view>
			<view class="selectBtn">
				<view class="selectBtnBox">
					<view class="btn" @tap="saveSetup(foodsList)"><text>保存设置</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		foodsList: {
			type: Array,
		}
	},
	data() {
		return {};
	},
	methods: {
		saveSetup(fl){
			this.$emit('saveSetup',fl);
		},
		checkboxChange(fl){
			this.$emit('checkboxChange',fl);
		}
	}
};
</script>

<style lang="less">
.selectFoodsList {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	width: 100%;
	.mark {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.35);
	}
	.selectContent {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 800upx;
		background-color: #fff;
		z-index: 1;
		flex-direction: column;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;
		overflow: hidden;
		.title {
			background-color: #f1f1f1;
			line-height: 100upx;
			font-size: 16px;
			color: #333;
			font-weight: 580;
			text-align: center;
		}
		.select-wrapper {
			width: 100%;
			height: 560upx;

			.selectWrapper {
				padding: 0 30upx;
				flex-direction: column;
				padding: 10upx 0;
				.item {
					background-color: #ffffff;
					position: relative;
					width: 100%;
					display: flex;
					flex-direction: column;
					
					.uni-list-cell {
						position: relative;
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						&.uni-list-cell-pd {
							padding: 15upx 30upx;
						}
						.name{
							margin-left: 20upx;
							color: #333;
							font-size: 16px;
						}
					}
				}
			}
		}
		.selectBtn{
			height: 135upx;
			padding: 0 30upx;
			.selectBtnBox{
				position: relative;
				flex: 1;
				border-top: 1px solid #f1f1f1;
				.btn{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 140upx;
					height: 60upx;
					background-color: #FFC843;
					border-radius: 5upx;
					font-size: 14px;
					color: #333;
					line-height: 60upx;
					
					text{
						width: 100%;
						height: 100%;
						text-align: center;
					}
				}
			}
		}
	}
}
</style>

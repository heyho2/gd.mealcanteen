<template>
	<view class="selectTime">
		<view class="mark"></view>
		<view class="selectContent">
			<text class="title">请选择可预订日期</text>
			<scroll-view class="select-wrapper" scroll-y :style="'height:' + heights + 'px'">
				<view class="selectWrapper">
					<view class="item" v-for="(dt, index) of dataList" :key="index">
						<view class="itemWeek">
							<text>日</text>
							<text>一</text>
							<text>二</text>
							<text>三</text>
							<text>四</text>
							<text>五</text>
							<text>六</text>
						</view>
						<view class="date">{{ dt.dataTime }}</view>
						<view class="dateList">
							<view v-for="(noData, i) of dt.nodata" :key="(i + 1) * 255"><text></text></view>
							<!-- <view class="active"><text>1</text></view>
							<view class="remove"><text>1</text></view>
							<view class="lock"><text>1</text></view> -->
							<view
								v-for="(data, d) of dt.data"
								:key="d"
								:class="{ remove: data.data <= dt.toDay, active: data.isSelect && !data.isLock, lock: data.isLock }"
								@click="selectDate(data, dt.toDay)"
							>
								<text v-text="data.data"></text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="timeBtn"><text @click="selectTime">确定</text></view>
	</view>
</template>

<script>
export default {
	props: {
		dataList: {
			type: Array
		},
		heights: {
			type: Number
		},
		selectDate1: {
			type: Function,
			default: () => {}
		}
	},
	data() {
		return {
			// heights: 0
		};
	},
	onLoad() {
		// console.log(this.$api);
	},
	methods: {
		selectDate(d, dt) {
			// debugger
			// this.$emit('selectDate', d, dt);
			this.selectDate1(d, dt);
		},
		selectTime() {
			this.$emit('selectTime');
		}
	}
};
</script>

<style lang="less">
.selectTime {
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
	.timeBtn {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		// background-color: #000;
		height: 100upx;
		border-top: 1px solid #f1f1f1;
		text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 140upx;
			height: 60upx;
			background-color: #ffc843;
			font-size: 16px;
			color: #333;
			border-radius: 5upx;
			text-align: center;
			line-height: 60upx;
		}
	}
	.selectContent {
		position: absolute;
		bottom: 0;
		left: 0;
		top: 65upx;
		right: 0;
		width: 100%;
		height: 100%;
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


	}
}
</style>

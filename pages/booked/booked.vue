<template>
	<view class="booked">
		<view class="selectDate" v-if="selectDate.length > 0">
			<scroll-view class="scroll-view_x" scroll-x>
				<!-- <view class="wrapContent"> -->
				<view class="item" v-for="(sd, index) of selectDate" :key="index" :class="{ active: selectTap == index }" @click="selectDateList(index, sd.month, sd.y)">
					<text class="week">{{ sd.week }}</text>
					<text class="data">{{ sd.month }}</text>
				</view>
				<!-- </view> -->
			</scroll-view>
		</view>
		<view class="bookedContent" v-if="bookedFoods.length > 0">
			<view class="breakfast item" v-for="(bf, index) of bookedFoods" :key="index">
				<view class="title">
					<text>{{ bf.categoryName }}</text>
					<text class="status" v-if="bf.isExpirationBook">预定中</text>
					<text class="status active" v-if="!bf.isExpirationBook">已截单</text>
				</view>
				<view class="contentList">
					<view v-for="(bfList, k) of bf.bookedDishesInfoList" :key="k">
						<text>{{ bfList.dishesName }}</text>
						<text class="count">{{ bfList.bookedTotal }}份</text>
					</view>
				</view>
			</view>
		</view>
		<view class="noData" v-if="bookedFoods.length <= 0"><image src="../../static/nodata.png"></image></view>
	</view>
</template>

<script>
import '@/common/linq';
import auth from '@/common/auth';
export default {
	data() {
		return {
			selectDate: [],
			day: 0,
			month: 0,
			year: 0,
			selectTap: 0,
			bookedFoods: [],
			selectD: null
		};
	},
	watch: {
		selectD(v) {
			this.getMealList(v);
		}
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
	onLoad() {
		let t = this;

		t.$api
			.GetUseFullDateListAsync({
				isShowNullDate: false
			})
			.then(res => {
				console.log(res);
				if (res.data.length > 0) {
					new Promise((resolve, reject) => {
						res.data.forEach(item => {
							// console.log(item)
							// debugger
							var y = item.menuDate.split('T')[0].split('-')[0];
							var m = item.menuDate.split('T')[0].split('-')[1];
							var d = item.menuDate.split('T')[0].split('-')[2];
							t.selectDate.push({
								week: auth.judgeWeek(y, m, d),
								month: m + '-' + d,
								y: y
							});
						});
						resolve(res.data[0].menuDate);
					}).then(data => {
						this.selectD = data;
						this.getMealList(data);
					});
				}
			})
			.catch(err => {});
	},
	methods: {
		getMealList(data) {
			this.$api
				.GetBookMealListAsync({
					Date: data
				})
				.then(res => {
					this.bookedFoods = res.data;
				})
				.catch(err => {});
		},
		selectDateList(i, m, y) {
			this.selectTap = i;
			var data = y + '-' + m;
			this.selectD = data;
		},
		// 判断传入日期是星期几
		judgeOneWeek(y, m, d) {
			var data = parseInt(new Date(new Date(y + '/' + m + '/' + d).getTime()).getDay());
			if (y - this.year == 0) {
				// return '今年'
				if (m - this.month == 0) {
					if (d - this.day == 1) {
						return '明天';
					} else if (d - this.day == 2) {
						return '后天';
					} else {
						switch (data) {
							case 1:
								return '周一';
								break;
							case 2:
								return '周二';
								break;
							case 3:
								return '周三';
								break;
							case 4:
								return '周四';
								break;
							case 5:
								return '周五';
								break;
							case 6:
								return '周六';
								break;
							case 0:
								return '周天';
								break;
						}
					}
				} else {
					switch (data) {
						case 1:
							return '周一';
							break;
						case 2:
							return '周二';
							break;
						case 3:
							return '周三';
							break;
						case 4:
							return '周四';
							break;
						case 5:
							return '周五';
							break;
						case 6:
							return '周六';
							break;
						case 0:
							return '周天';
							break;
					}
				}
			}
		}
	}
};
</script>

<style lang="less">
.booked {
	width: 750upx;
	flex-direction: column;
	.noData {
		width: 100%;
		align-items: center;
		justify-content: center;
		image {
			width: 673upx;
			height: 604upx;
		}
	}
	.selectDate {
		width: 100%;
		white-space: nowrap;
		background-color: #fff;
		align-items: center;
		.scroll-view_x {
			width: 100%;
			height: 100upx;
			.wrapContent {
				width: 100%;
				height: 100upx;
				align-items: center;
			}
			.item {
				display: inline-block;
				width: 190upx;

				height: 100upx;
				line-height: 30upx;
				text-align: center;
				text {
					display: block;
					color: #333;
					&.week {
						font-size: 12px;
						margin-top: 16upx;
					}
					&.data {
						font-size: 28upx;
						margin-top: 10upx;
					}
				}
				&.active {
					background-color: #ffc843;
				}
			}
			.wrapContent {
				// flex-wrap: nowrap;
				width: 100%;
				background-color: #fff;
				padding: 0 30upx;
			}
		}
	}

	.bookedContent {
		padding: 10upx 20upx 0;

		flex-direction: column;
		.item {
			// width: 100%;
			// flex: 1;
			// justify-content: flex-start;
			flex-direction: column;
			margin-top: 20upx;
			border-radius: 15upx;
			padding: 0 30upx;
			background-color: #fff;
			overflow: hidden;
			.title {
				// width: 100%;
				position: relative;
				flex: 1;
				height: 50upx;
				display: flex;
				padding: 10upx 0;
				border-bottom: 1px solid #e1e1e1;
				text {
					flex: 1;
					text-align: left;
					color: #333;
					font-weight: 600;
					font-size: 36upx;
					font-family: 'PingFangSC-Medium';
					&.status {
						position: absolute;
						top: 0;
						right: 0;
						width: 120upx;
						height: 40upx;
						// background-color: #000;
						transform: translateX(30upx);
						color: red;
						font-size: 28upx;
						text-align: center;
						color: #fff;
						background-color: #ff4343;
						border-bottom-left-radius: 15upx;
						&.active {
							color: #999;
							background-color: #b3b3b3;
						}
					}
				}
			}
			.contentList {
				display: block;
				// width: 750upx;
				margin-top: 5upx;
				background-color: #fff;
				flex-direction: column;
				padding: 30upx 0;
				view {
					display: flex;
					// padding-top: 15upx;
					// line-height: 50upx;
					text {
						font-size: 28upx;
						// padding: 15upx 0;
						padding-bottom: 30upx;
						flex: 1;
						text-align: left;
						color: #666;
						&.count {
							text-align: right;
							flex: 0.4;
							// border-left: 1px solid #f1f1f1;
						}
					}
				}
			}
		}
	}
}
</style>

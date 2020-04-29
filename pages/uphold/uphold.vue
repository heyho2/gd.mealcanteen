<template>
	<view class="maintain">
		<view class="selectDate">
			<view class="dateIcon" @click="togglePopup('bottom-share')">
				<image class="phoneIcon" src="../../static/data.png"></image>
				<text>全部日期</text>
			</view>
			<view class="selectDate-wrap">
				<scroll-view class="scroll-view_x" scroll-x>
					<view class="item" v-for="(sdl, index) of selectDateList" :key="index" :class="{ active: tap == index }" @tap="selectDataTap(index, sdl.month, sdl.y)">
						<text class="week">{{ sdl.week }}</text>
						<text class="data">{{ sdl.month }}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="content">
			<scroll-view class="menu-wrapper" scroll-y :style="'height:' + height + 'px'">
				<view class="menuWrapper">
					<!-- mealList -->
					<view class="item" v-for="(item, index) in mealList" :key="index" ref="menuList" @click="select(index)" :class="{ active: currentIndex == index }">
						<text>{{ item.categoryName }}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="content-wrapper" scroll-y :style="'height:' + (height - 100) + 'px'" :scroll-top="foodSTop">
				<view class="contentWrapper">
					<text class="title">已添加菜品</text>
					<view class="item">
						<text v-for="(fl, index) of foodsList" :key="index">{{ fl.dishesName }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="addFoods" @click="toggleFdPopup('bottom-foods')">
			<image src="../../static/add.png"></image>
			<text>添加</text>
		</view>
		<!-- 选择时间 -->
		<uni-popup :show="type === 'bottom-share'" class="popupBottom" position="bottom" @hidePopup="togglePopup('')">
			<!-- <view class="selectTime"> -->
			<view class="selectTime-title">请选择可预订日期</view>
			<scroll-view class="select-wrapper" scroll-y>
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
			<view class="timeBtn"><view @click="selectTime">确定</view></view>
			<!-- </view> -->
		</uni-popup>
		<!-- 编辑菜品 -->
		<uni-popup :show="fdtype === 'bottom-foods'" class="popupBottom" position="bottom" @hidePopup="toggleFdPopup('')">
			<!-- <view class="selectTime"> -->
			<view class="selectTime-title">{{setMealname}}设置</view>
			<scroll-view class="selectfd-wrapper" scroll-y>
				<view class="selectWrapper">
					<view class="item" v-for="(fl, index) of foodsLists" :key="index">
						<checkbox-group @change="checkboxChange(fl)">
							<label class="uni-list-cell uni-list-cell-pd">
								<view><checkbox :checked="fl.isChecked" :value="fl.dishesGuid" color="#ffc843" /></view>
								<view class="name">{{ fl.dishesName }}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
			</scroll-view>
			<view class="timeBtn"><view @click="saveSetup(foodsLists)">保存设置</view></view>
			<!-- </view> -->
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import selectlist from '@/components/selectFoodsList.vue';
import selecttime from '@/components/selectTime.vue';
import '@/common/linq';
import auth from '@/common/auth';
export default {
	components: {
		selectlist,
		selecttime,
		uniPopup
	},
	data() {
		return {
			type: '',
			fdtype: '',
			height: 0,
			heights: 0,
			currentIndex: 0,
			foodSTop: 0,
			selectStatus: '',
			dataList: [],
			today: 0,
			nextMonth: {},
			mealList: [],
			foodsList: [],
			foodsLists: [],
			selectDateList: [],
			tap: 0,
			setLocalData: [],
			selectD: null,
			setMealname: ''
		};
	},
	watch: {},
	onShow() {
		this.getDataLists();
	},
	onLoad() {
		let t = this;
		this.heights = Number(uni.getSystemInfoSync().windowHeight) - 140;
		this.height = Number(uni.getSystemInfoSync().windowHeight) - 55;
		// 加载日期
		this.$api
			.GetUseFullDateListAsync({
				isShowNullDate: true
			})
			.then(res => {
				if(res.data.length > 0){
					new Promise((resolve,error)=>{
						res.data.forEach(item => {
							var y = item.menuDate.split('T')[0].split('-')[0];
							var m = item.menuDate.split('T')[0].split('-')[1];
							var d = item.menuDate.split('T')[0].split('-')[2];
							t.selectDateList.push({
								week: auth.judgeWeek(y, m, d),
								month: m + '-' + d,
								y: y
							});
							t.setLocalData.push({
								y: y,
								m: m,
								d: d,
								isNull: false
							});
						});
						resolve(res.data[0].menuDate);
					}).then((data)=>{
						t.getCategoryList(data);
						t.getDataLists();
					});
				}else{
					t.getCategoryList();
				}
			})
			.catch(err => {});
	},
	methods: {
		// 选择餐别
		select(index) {
			this.currentIndex = index;
			this.selectStatus = this.mealList[index].categoryGuid;
			this.setMealname = this.mealList[index].categoryName;
			console.log(this.selectD);
			if(this.selectD){
				this.getFoodsList(this.selectStatus, this.selectD);
			}
		},
		// 获取餐别
		getCategoryList(data){
			this.selectD = data;
			this.$api
				.GetCategoryListAsync()
				.then(res => {
					this.mealList = res.data;
					this.selectStatus = res.data[0].categoryGuid;
					this.setMealname = res.data[0].categoryName;
					if(data){
						this.getFoodsList(res.data[0].categoryGuid, data);
					}
					
				})
				.catch(err => {});
		},
		// 菜品选择添加删除
		saveSetup(fl) {
			var aa = fl
				.where(a => a.isChecked == true)
				.select(item => {
					return item.dishesGuid;
				});
			this.$api
				.AddDisheMaintenanceAsync({
					Date: this.selectD,
					CategoryGuid: this.selectStatus,
					DishesGuidArr: aa
				})
				.then(res => {
					console.log(res);
					if (res.code == 0) {
						this.fdtype = '';
						// console.log(this.selectD);
						this.setLocalData.push({
							y: this.selectD.split('-')[0],
							m: this.selectD.split('-')[1],
							d: this.selectD.split('-')[2],
							isNull: false
						});
						this.getDataLists();
						
						this.$api
							.GetDisheMaintenanceAsync({
								Date: this.selectD,
								CategoryGuid: this.selectStatus
							})
							.then(res => {
								this.foodsList = res.data;
							})
							.catch(err => {});
					}
				})
				.catch(err => {});
				this.fdtype = '';
		},
		// 显示添加菜品列表
		addFoodsList(data) {
			this.$api
				.GetCheckedDisheMaintenanceAsync({
					Date: data,
					CategoryGuid: this.selectStatus
				})
				.then(res => {
					// console.log(res);
					this.foodsLists = res.data;
				})
				.catch(err => {});
		},
		// 选择日期，展示商品列表
		selectDataTap(i, d, y) {
			this.tap = i;
			var t = uni.getStorageSync('thisYear');
			var data = y + '-' + d;
			// console.log(data);
			this.selectD = data;
			this.getFoodsList(this.selectStatus, data);
			
		},
		// 显示选择日期下的食品列表
		getFoodsList(status, data) {
			this.$api
				.GetDisheMaintenanceAsync({
					Date: data,
					CategoryGuid: status
				})
				.then(res => {
					this.foodsList = res.data;
				})
				.catch(err => {});
		},
		// 复选框
		checkboxChange(fl) {
			this.$set(fl, 'isChecked', !fl.isChecked);
		},
		// 时间日历弹窗控制
		togglePopup(type) {
			this.type = type;
		},
		// 菜品选择弹窗控制
		toggleFdPopup(type) {
			this.addFoodsList(this.selectD);
			this.fdtype = type;
		},
		// 保存天数，制作日历
		saveData(dataTime, nodata, data, d, m, y) {
			// data
			// debugger
			var arr = [];
			let t = this;
			new Promise((resolve, reject) => {
				for (var i = 0, len = data; i < len; i++) {
					arr.push({
						data: i + 1,
						month: m,
						year: y,
						isLock: false,
						isSelect: false,
						hasFoods: false
					});
				}
				for (var i = 0, len = arr.length; i < len; i++) {
					for (var j = 0, jen = t.setLocalData.length; j < jen; j++) {
						if (arr[i].year == t.setLocalData[j].y && arr[i].month == t.setLocalData[j].m && arr[i].data == t.setLocalData[j].d) {
							arr[i].isLock = !arr[i].isLock;
							arr[i].isSelect = !arr[i].isSelect;
						}
					}
				}
				resolve();
			}).then(() => {
				t.dataList.push({
					dataTime: dataTime,
					nodata: nodata,
					data: arr,
					toDay: d
				});
			});
		},
		// 选择日历日期
		selectDate(d, dt) {
			if (d.data <= dt) {
				return false;
			}
			// isLock
			if (d.isLock) {
				return false;
			}
		
			this.$set(d, 'isLock', false);
			this.$set(d, 'isSelect', !d.isSelect);
		},
		// 确认选择日期
		selectTime() {
			var selectDate = [];
			// this.selectDateList = []
			let t = this;
			this.dataList.forEach(item => {
				var arr = [];
				arr = item.data.filter(d => {
					return d.isSelect == true && !d.isLock;
				});
				if (arr.length > 0) {
					selectDate.push(arr);
				}
			});
		
			if (selectDate.length == 0) {
				uni.showToast({
					title: '请选择日期',
					icon: 'none',
					mask: true
				});
			} else {
				// console.log(selectDate);
				selectDate.forEach(sd => {
					/* data: 21, month: 6, year: 2019 */
					// console.log(sd);
					sd.forEach(dat => {
						t.selectDateList.push({
							week: auth.judgeWeek(dat.year, dat.month, dat.data),
							month: (dat.month < 10 ? '0'+dat.month:dat.month) + '-' + (dat.data <10 ? '0'+dat.data:dat.data),
							y: dat.year
						});
					});
				});
				this.type = '';
				t.selectD = t.selectDateList[0].y + '-' + t.selectDateList[0].month;
				uni.setStorage({
					key: 'selectDate',
					data: selectDate,
					success: function() {
					}
				});
			}
		},
		// 获取日历方法集合
		getDataLists(){
			this.getNewDate();
			this.getNestDate();
		},
		// 获取当月的天数
		getNewDate() {
			var t = uni.getStorageSync('thisYear');
			this.today = t.d;
			let dataTime = t.y + '年' + t.m + '月';
			this.saveData(dataTime, this.judgeOneWeek(t.y, t.m), this.computeMonth(t.y, t.m), this.today, t.m, t.y);
		},
		// 获取下月的天数
		getNestDate() {
			this.dataList = [];
			var t = uni.getStorageSync('thisYear');
			let y = t.y;
			let m = t.m + 1;
			if (m > 12) {
				y = t.y + 1;
			}
			let dataTime = y + '年' + m + '月';
			// console.log(y,m);
			this.saveData(dataTime, this.judgeOneWeek(y, m), this.computeMonth(y, m), 0, m, y);
		},
		// 计算当月有几天
		computeMonth(year, month) {
			var d = new Date(year, month, 0);
			return d.getDate();
		},
		// 判断一号是星期几
		judgeOneWeek(y, m) {
			return parseInt(new Date(new Date(y + '/' + m + '/' + 1).getTime()).getDay());
		},
	}
};
</script>
<style>
.uni-popup-bottom {
	flex-direction: column;
}
</style>
<style lang="less">
.maintain {
	width: 100%;
	overflow: hidden;
	flex-direction: column;
	.selectDate {
		width: 100%;
		white-space: nowrap;
		background-color: #fff;
		align-items: center;
		.dateIcon {
			height: 100upx;
			width: 100upx;
			flex-direction: column;
			border-right: 1px solid #f1f1f1;
			padding: 0 10upx;
			image {
				width: 40upx;
				height: 40upx;
				margin: 0 auto;
				margin-top: 17upx;
			}
			text {
				font-size: 20upx;
				color: #999;
				text-align: center;
				margin-top: 5upx;
			}
		}
		.selectDate-wrap {
			width: 650upx;
			height: 100upx;
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
					width: 160upx;
					height: 100upx;
					line-height: 30upx;
					text-align: center;
					text {
						display: block;
						color: #333;
						&.week {
							font-size: 24upx;
							margin-top: 16upx;
						}
						&.data {
							font-size: 14px;
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
	}
	.content {
		width: 100%;
		margin-top: 10upx;
		background-color: #fff;
		.menu-wrapper {
			text-align: center;
			width: 26%;
			display: flex;
			flex-direction: column;
			background: #f1f1f1;
			.menuWrapper {
				width: 100%;
				flex-direction: column;

				.item {
					width: 100%;
					height: 100upx;
					background-color: #e1e1e1;
					text {
						width: 100%;
						line-height: 100upx;
						text-align: center;
						font-size: 32upx;
					}
					&.active {
						background-color: #fff;
					}
				}
			}
		}
		.content-wrapper {
			position: relative;
			width: 74%;
			background-color: #fff;
			border-bottom: 1px solid #f1f1f1;
			// padding-bottom: 140upx;
			.contentWrapper {
				width: 100%;
				flex-direction: column;
				// padding-bottom: 140upx;
				.title {
					position: relative;
					padding-left: 30upx;
					padding-top: 30upx;
					padding-bottom: 45upx;
					font-size: 28upx;
					color: #333;
					&:before {
						content: '';
						position: absolute;
						top: 40upx;
						left: 15upx;
						// transform: translateY(-50%);
						width: 4upx;
						height: 20upx;
						background-color: #ffc843;
					}
				}
				.item {
					text-align: center;
					flex-direction: column;
					padding: 0 30upx;
					text {
						width: 100%;
						font-size: 32upx;
						color: #333;
						text-align: center;
						padding-bottom: 35upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
	.addFoods {
		position: fixed;
		bottom: 60upx;
		right: 185upx;
		width: 180upx;
		height: 60upx;
		line-height: 60upx;
		background-color: #fff;
		border: 2px solid rgba(255, 200, 67, 1);
		border-radius: 5upx;
		font-size: 32upx;
		color: #ffc843;
		text-indent: 80upx;
		image {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 40upx;
			width: 30upx;
			height: 30upx;
		}
		text {
			width: 100%;
		}
	}
	// 时间弹窗
	.selectTime-title {
		height: 100upx;
		line-height: 100upx;
		background-color: #f1f1f1;
		font-size: 32upx;
		color: #333;
		justify-content: center;
	}
	.select-wrapper {
		height: 650upx;
		border-bottom: 1px solid #f1f1f1;
		display: flex;
		.selectWrapper {
			flex-direction: column;
			.item {
				position: relative;
				width: 100%;
				flex-direction: column;
				.itemWeek {
					width: 100%;
					padding: 30upx 0;
					line-height: 30upx;
					text {
						flex: 1;
						text-align: center;
						font-size: 32upx;
						color: #333;
					}
				}
				.date {
					flex: 1;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					color: #999;
					margin-bottom: 20upx;
					line-height: 25upx;
				}
				.dateList {
					flex-wrap: wrap;
					view {
						width: 14.28%;
						align-items: center;
						justify-content: center;
						margin-bottom: 20upx;
						text {
							width: 70upx;
							height: 70upx;
							line-height: 70upx;
							text-align: center;
							font-size: 16px;
							color: #333;
						}
						&.remove {
							text {
								color: #b3b3b3;
							}
						}
						&.active {
							text {
								border-radius: 50%;
								background-color: #ffc843;
							}
						}
						&.lock {
							position: relative;
							text {
								border-radius: 5upx;
								background-color: #ba902c;
							}
							&:after {
								content: '';
								position: absolute;
								bottom: 0;
								right: 0;
								width: 18upx;
								height: 22upx;
								transform: translateX(-100%);
								background-image: url(../../static/lock.png);
								background-size: 18upx 22upx;
							}
						}
					}
				}
				&:first-child {
					&:after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 670upx;
						height: 1px;
						background-color: #f1f1f1;
					}
				}
			}
		}
	}
	.timeBtn {
		justify-content: center;
		align-items: center;
		height: 100upx;
		view {
			width: 140upx;
			height: 60upx;
			background-color: #ffc843;
			font-size: 32upx;
			color: #333;
			border-radius: 5upx;
			line-height: 60upx;
			justify-content: center;
		}
	}
	// 菜品编辑弹窗
	.selectfd-wrapper {
		width: 100%;
		height: 560upx;
		border-bottom: 1px solid #f1f1f1;
		.selectWrapper {
			padding: 0 30upx;
			flex-direction: column;
			padding: 10upx 0;
			.item {
				background-color: #ffffff;
				position: relative;
				width: 100%;
				display: flex;
				line-height: 60upx;
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
					.name {
						margin-left: 20upx;
						color: #333;
						font-size: 32upx;
					}
				}
			}
		}
	}
}
</style>

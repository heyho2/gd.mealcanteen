<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
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
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './common/common.css';

page,
view {
	display: flex;
}

page {
	display: flex;
	min-height: 100%;
	background-color: #efefef;
}

template {
	display: flex;
	flex: 1;
}
</style>

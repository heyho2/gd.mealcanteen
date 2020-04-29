// token
const TOKEN = 'token';
let val = '';
const getToken = function() {
	uni.getStorage({
		key: TOKEN,
		success: function(res) {
			// console.log(res.data)
			val = res.data
		}
	});
	return val
	// return uni.getStorageSync(TOKEN)
}
const setToken = function(data) {
	uni.setStorage({
		key: TOKEN,
		data: data,
		success: function() {}
	});
}
const removeToken = function() {
	uni.removeStorage({
		key: TOKEN,
		success: function(res) {
			console.log(res);
		}
	});
}
// 检验当前选的日期是星期几
const judgeWeek = function(y, m, d) {
	// ?thisYear
	// debugger
	var data = parseInt(new Date(new Date(y + '/' + m + '/' + d).getTime()).getDay());
	var t = uni.getStorageSync('thisYear')
	
/* 	uni.getStorage({
			key: 'thisYear',
			success: function(res) {
				console.log(res.data.m) */
					if (y - t.y == 0) {
					// return '今年'
					if(m-t.m == 0){
						if(d-t.d == 1){
							return '明天'
						}else if(d-t.d == 2){
							return '后天'
						}else{
							switch (data){
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
					}else{
						switch (data){
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
				
				
/* 			}
	}) */


}
// 截取月份 intercept
const interceptMonth = function(data) {
	let y = data.split('T')[0];
	let m = y.split('-')[1]
	let d = y.split('-')[2]
	return m + '-' + d
}
const toFix = function(v){
	return v.toFixed(2);
}

export default {
	getToken,
	setToken,
	removeToken,
	judgeWeek,
	interceptMonth,
	toFix
}

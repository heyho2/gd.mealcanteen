(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/uphold/uphold"],{"0356":function(t,e,s){"use strict";s.r(e);var a=s("8db5"),i=s("04e1");for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);s("462e"),s("5053");var c=s("2877"),o=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},"03c7":function(t,e,s){},"04e1":function(t,e,s){"use strict";s.r(e);var a=s("4f7e"),i=s.n(a);for(var n in a)"default"!==n&&function(t){s.d(e,t,function(){return a[t]})}(n);e["default"]=i.a},"07a8":function(t,e,s){"use strict";s("d624");var a=n(s("b0ce")),i=n(s("0356"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"462e":function(t,e,s){"use strict";var a=s("eed8"),i=s.n(a);i.a},"4f7e":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(s("1e35")),i=o(s("1e67")),n=o(s("4315"));s("7e26");var c=o(s("8c41"));function o(t){return t&&t.__esModule?t:{default:t}}var l={components:{selectlist:i.default,selecttime:n.default,uniPopup:a.default},data:function(){return{type:"",fdtype:"",height:0,heights:0,currentIndex:0,foodSTop:0,selectStatus:"",dataList:[],today:0,nextMonth:{},mealList:[],foodsList:[],foodsLists:[],selectDateList:[],tap:0,setLocalData:[],selectD:null}},watch:{},onShow:function(){this.getDataLists()},onLoad:function(){var e=this;this.heights=Number(t.getSystemInfoSync().windowHeight)-140,this.height=Number(t.getSystemInfoSync().windowHeight)-55,this.$api.GetUseFullDateListAsync().then(function(t){t.data.length>0?new Promise(function(s,a){t.data.forEach(function(t){var s=t.menuDate.split("T")[0].split("-")[0],a=t.menuDate.split("T")[0].split("-")[1],i=t.menuDate.split("T")[0].split("-")[2];e.selectDateList.push({week:c.default.judgeWeek(s,a,i),month:a+"-"+i,y:s}),e.setLocalData.push({y:s,m:a,d:i,isNull:!1})}),s(t.data[0].menuDate)}).then(function(t){e.getCategoryList(t),e.getDataLists()}):e.getCategoryList()}).catch(function(t){})},methods:{select:function(t){this.currentIndex=t,this.selectStatus=this.mealList[t].categoryGuid,console.log(this.selectD),this.selectD&&this.getFoodsList(this.selectStatus,this.selectD)},getCategoryList:function(t){var e=this;this.selectD=t,this.$api.GetCategoryListAsync().then(function(s){e.mealList=s.data,e.selectStatus=s.data[0].categoryGuid,t&&e.getFoodsList(s.data[0].categoryGuid,t)}).catch(function(t){})},saveSetup:function(t){var e=this,s=t.where(function(t){return 1==t.isChecked}).select(function(t){return t.dishesGuid});this.$api.AddDisheMaintenanceAsync({Date:this.selectD,CategoryGuid:this.selectStatus,DishesGuidArr:s}).then(function(t){0==t.code&&(e.fdtype="",e.setLocalData.push({y:e.selectD.split("-")[0],m:e.selectD.split("-")[1],d:e.selectD.split("-")[2],isNull:!1}),e.$api.GetDisheMaintenanceAsync({Date:e.selectD,CategoryGuid:e.selectStatus}).then(function(t){e.foodsList=t.data}).catch(function(t){}))}).catch(function(t){}),this.fdtype=""},addFoodsList:function(t){var e=this;this.$api.GetCheckedDisheMaintenanceAsync({Date:t,CategoryGuid:this.selectStatus}).then(function(t){e.foodsLists=t.data}).catch(function(t){})},selectDataTap:function(e,s,a){this.tap=e;t.getStorageSync("thisYear");var i=a+"-"+s;this.selectD=i,this.getFoodsList(this.selectStatus,i)},getFoodsList:function(t,e){var s=this;this.$api.GetDisheMaintenanceAsync({Date:e,CategoryGuid:t}).then(function(t){s.foodsList=t.data}).catch(function(t){})},checkboxChange:function(t){this.$set(t,"isChecked",!t.isChecked)},togglePopup:function(t){this.type=t},toggleFdPopup:function(t){this.addFoodsList(this.selectD),this.fdtype=t},saveData:function(t,e,s,a,i,n){var c=[],o=this;new Promise(function(t,e){for(var a=0,l=s;a<l;a++)c.push({data:a+1,month:i,year:n,isLock:!1,isSelect:!1,hasFoods:!1});for(a=0,l=c.length;a<l;a++)for(var u=0,r=o.setLocalData.length;u<r;u++)c[a].year==o.setLocalData[u].y&&c[a].month==o.setLocalData[u].m&&c[a].data==o.setLocalData[u].d&&(c[a].isLock=!0,c[a].isSelect=!0);t()}).then(function(){o.dataList.push({dataTime:t,nodata:e,data:c,toDay:a})})},selectDate:function(t,e){return!(t.data<=e)&&(!t.isLock&&(this.$set(t,"isLock",!1),void this.$set(t,"isSelect",!t.isSelect)))},selectTime:function(){var e=[],s=this;this.dataList.forEach(function(t){var s=[];s=t.data.filter(function(t){return 1==t.isSelect&&!t.isLock}),s.length>0&&e.push(s)}),0==e.length?t.showToast({title:"请选择日期",icon:"none",mask:!0}):(e.forEach(function(t){t.forEach(function(t){s.selectDateList.push({week:c.default.judgeWeek(t.year,t.month,t.data),month:(t.month<10?"0"+t.month:t.month)+"-"+(t.data<10?"0"+t.data:t.data),y:t.year})})}),this.type="",s.selectD=s.selectDateList[0].y+"-"+s.selectDateList[0].month,t.setStorage({key:"selectDate",data:e,success:function(){}}))},getDataLists:function(){this.getNewDate(),this.getNestDate()},getNewDate:function(){var e=t.getStorageSync("thisYear");this.today=e.d;var s=e.y+"年"+e.m+"月";this.saveData(s,this.judgeOneWeek(e.y,e.m),this.computeMonth(e.y,e.m),this.today,e.m,e.y)},getNestDate:function(){this.dataList=[];var e=t.getStorageSync("thisYear"),s=e.y,a=e.m+1;a>12&&(s=e.y+1);var i=s+"年"+a+"月";this.saveData(i,this.judgeOneWeek(s,a),this.computeMonth(s,a),0,a,s)},computeMonth:function(t,e){var s=new Date(t,e,0);return s.getDate()},judgeOneWeek:function(t,e){return parseInt(new Date(new Date(t+"/"+e+"/1").getTime()).getDay())}}};e.default=l}).call(this,s("6e42")["default"])},5053:function(t,e,s){"use strict";var a=s("03c7"),i=s.n(a);i.a},"8db5":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"maintain"},[s("view",{staticClass:"selectDate"},[s("view",{staticClass:"dateIcon",attrs:{eventid:"0129b875-0"},on:{click:function(e){t.togglePopup("bottom-share")}}},[s("image",{staticClass:"phoneIcon",attrs:{src:"../../static/data.png"}}),s("text",[t._v("全部日期")])]),s("view",{staticClass:"selectDate-wrap"},[s("scroll-view",{staticClass:"scroll-view_x",attrs:{"scroll-x":""}},t._l(t.selectDateList,function(e,a){return s("view",{key:a,staticClass:"item",class:{active:t.tap==a},attrs:{eventid:"0129b875-1-"+a},on:{tap:function(s){t.selectDataTap(a,e.month,e.y)}}},[s("text",{staticClass:"week"},[t._v(t._s(e.week))]),s("text",{staticClass:"data"},[t._v(t._s(e.month))])])}))],1)]),s("view",{staticClass:"content"},[s("scroll-view",{staticClass:"menu-wrapper",style:"height:"+t.height+"px",attrs:{"scroll-y":""}},[s("view",{staticClass:"menuWrapper"},t._l(t.mealList,function(e,a){return s("view",{key:a,ref:"menuList",refInFor:!0,staticClass:"item",class:{active:t.currentIndex==a},attrs:{eventid:"0129b875-2-"+a},on:{click:function(e){t.select(a)}}},[s("text",[t._v(t._s(e.categoryName))])])}))]),s("scroll-view",{staticClass:"content-wrapper",style:"height:"+(t.height-100)+"px",attrs:{"scroll-y":"","scroll-top":t.foodSTop}},[s("view",{staticClass:"contentWrapper"},[s("text",{staticClass:"title"},[t._v("已添加菜品")]),s("view",{staticClass:"item"},t._l(t.foodsList,function(e,a){return s("text",{key:a},[t._v(t._s(e.dishesName))])}))])])],1),s("view",{staticClass:"addFoods",attrs:{eventid:"0129b875-3"},on:{click:function(e){t.toggleFdPopup("bottom-foods")}}},[s("image",{attrs:{src:"../../static/add.png"}}),s("text",[t._v("添加")])]),s("uni-popup",{staticClass:"popupBottom",attrs:{show:"bottom-share"===t.type,position:"bottom",eventid:"0129b875-6",mpcomid:"0129b875-0"},on:{hidePopup:function(e){t.togglePopup("")}}},[s("view",{staticClass:"selectTime-title"},[t._v("请选择可预订日期")]),s("scroll-view",{staticClass:"select-wrapper",attrs:{"scroll-y":""}},[s("view",{staticClass:"selectWrapper"},t._l(t.dataList,function(e,a){return s("view",{key:a,staticClass:"item"},[s("view",{staticClass:"itemWeek"},[s("text",[t._v("日")]),s("text",[t._v("一")]),s("text",[t._v("二")]),s("text",[t._v("三")]),s("text",[t._v("四")]),s("text",[t._v("五")]),s("text",[t._v("六")])]),s("view",{staticClass:"date"},[t._v(t._s(e.dataTime))]),s("view",{staticClass:"dateList"},[t._l(e.nodata,function(t,e){return s("view",{key:255*(e+1)},[s("text")])}),t._l(e.data,function(i,n){return s("view",{key:n,class:{remove:i.data<=e.toDay,active:i.isSelect&&!i.isLock,lock:i.isLock},attrs:{eventid:"0129b875-4-"+a+"-"+n},on:{click:function(s){t.selectDate(i,e.toDay)}}},[s("text",{domProps:{textContent:t._s(i.data)}})])})],2)])}))]),s("view",{staticClass:"timeBtn"},[s("view",{attrs:{eventid:"0129b875-5"},on:{click:t.selectTime}},[t._v("确定")])])],1),s("uni-popup",{staticClass:"popupBottom",attrs:{show:"bottom-foods"===t.fdtype,position:"bottom",eventid:"0129b875-9",mpcomid:"0129b875-2"},on:{hidePopup:function(e){t.toggleFdPopup("")}}},[s("view",{staticClass:"selectTime-title"},[t._v("早餐设置")]),s("scroll-view",{staticClass:"selectfd-wrapper",attrs:{"scroll-y":""}},[s("view",{staticClass:"selectWrapper"},t._l(t.foodsLists,function(e,a){return s("view",{key:a,staticClass:"item"},[s("checkbox-group",{attrs:{eventid:"0129b875-7-"+a,mpcomid:"0129b875-1-"+a},on:{change:function(s){t.checkboxChange(e)}}},[s("label",{staticClass:"uni-list-cell uni-list-cell-pd"},[s("view",[s("checkbox",{attrs:{checked:e.isChecked,value:e.dishesGuid,color:"#ffc843"}})],1),s("view",{staticClass:"name"},[t._v(t._s(e.dishesName))])])],1)],1)}))]),s("view",{staticClass:"timeBtn"},[s("view",{attrs:{eventid:"0129b875-8"},on:{click:function(e){t.saveSetup(t.foodsLists)}}},[t._v("保存设置")])])],1)],1)},i=[];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},eed8:function(t,e,s){}},[["07a8","common/runtime","common/vendor"]]]);
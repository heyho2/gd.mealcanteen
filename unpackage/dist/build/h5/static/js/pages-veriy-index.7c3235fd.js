(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-veriy-index"],{"26e1":function(e,t,i){"use strict";var n=i("6b3c"),o=i.n(n);o.a},"41d7":function(e,t,i){"use strict";i.r(t);var n=i("5643"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t["default"]=o.a},5643:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n(i("d132"));function n(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{id:null,form:{},isSuccess:!0}},onShow:function(){},onLoad:function(e){var t=this;this.id=e.id,this.$api.ScanToGetDisheAsync({OrderGuid:e.id}).then(function(e){console.log(e),0==e.code?(e.data.totalPrice=e.data.totalPrice.toFixed(2),e.data.dishesDetail.forEach(function(e){e.unitPrice=e.unitPrice.toFixed(2)}),t.form=e.data,t.isSuccess=!0):t.isSuccess=!1}).catch(function(e){})},methods:{select:function(){uni.scanCode({onlyFromCamera:!0,success:function(e){console.log(e),uni.navigateTo({url:"/pages/veriy/index?id="+e.result})},fail:function(e){console.log(e)}})}}};t.default=o},"6b3c":function(e,t,i){var n=i("919d");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("36a13569",n,!0,{sourceMap:!1,shadowMode:!1})},"85ee":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"veriy"},[e.isSuccess?i("v-uni-view",{staticClass:"result"},[i("v-uni-view",[i("v-uni-image",{attrs:{src:"../../static/veriySuc.png",mode:""}})],1),i("v-uni-view",[i("v-uni-text",[e._v("验证成功")])],1)],1):e._e(),e.isSuccess?i("v-uni-view",{staticClass:"info"},[i("v-uni-text",{staticClass:"title"},[e._v("订单详情")]),i("v-uni-view",{staticClass:"list"},e._l(e.form.dishesDetail,function(t,n){return i("v-uni-view",{key:n,staticClass:"item"},[i("v-uni-text",{staticClass:"name"},[e._v(e._s(t.dishesName))]),i("v-uni-text",{staticClass:"count"},[e._v("X"+e._s(t.quantity))]),i("v-uni-text",{staticClass:"price"},[e._v("￥"+e._s(t.unitPrice))])],1)}),1),i("v-uni-text",{staticClass:"total"},[i("v-uni-text",[e._v("共计")]),i("v-uni-text",{staticClass:"totalPrice"},[e._v("￥"+e._s(e.form.totalPrice))])],1)],1):e._e(),e.isSuccess?e._e():i("v-uni-view",{staticClass:"completed"},[i("v-uni-image",{attrs:{src:"../../static/Completed.png"}}),i("v-uni-text",[e._v("就餐码已失效")])],1),i("v-uni-view",{staticClass:"btn",on:{click:function(t){t=e.$handleEvent(t),e.select(t)}}},[e._v(e._s(e.isSuccess?"确认":"返回"))])],1)},o=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return o})},"919d":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".veriy[data-v-01bb5a67]{width:%?750?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.veriy .btn[data-v-01bb5a67]{width:%?140?%;height:%?60?%;-webkit-border-radius:%?5?%;border-radius:%?5?%;background-color:#ffbf36;font-size:%?28?%;color:#333;text-align:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin:0 auto;margin-top:%?90?%}.veriy .completed[data-v-01bb5a67]{width:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.veriy .completed uni-image[data-v-01bb5a67]{width:%?106?%;height:%?106?%;margin-top:%?200?%}.veriy .completed uni-text[data-v-01bb5a67]{margin-top:%?50?%;font-size:%?30?%;color:#ff2f2f}.veriy .result[data-v-01bb5a67]{width:100%;height:%?350?%;background-color:#fff;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:%?10?%}.veriy .result uni-image[data-v-01bb5a67]{display:block;width:%?106?%;height:%?106?%;margin:0 auto;margin-top:%?80?%}.veriy .result uni-text[data-v-01bb5a67]{display:block;width:100%;text-align:center;font-size:%?50?%;font-weight:600;margin-top:%?40?%}.veriy .info[data-v-01bb5a67]{margin-top:%?10?%;background-color:#fff;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.veriy .info .title[data-v-01bb5a67]{width:100%;line-height:%?88?%;font-size:%?40?%;font-weight:580;color:#333;padding:0 %?30?%}.veriy .info .total[data-v-01bb5a67]{text-align:right;padding:0 %?30?%;line-height:%?88?%;font-size:%?40?%;font-weight:580;color:#333}.veriy .info .total .totalPrice[data-v-01bb5a67]{margin-left:%?45?%}.veriy .info .list[data-v-01bb5a67]{display:block;padding:%?40?% %?30?% %?10?%;border-bottom:1px solid #e1e1e1;border-top:1px solid #e1e1e1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.veriy .info .list .item[data-v-01bb5a67]{padding-bottom:%?30?%}.veriy .info .list .item uni-text[data-v-01bb5a67]{font-size:20px;color:#666}.veriy .info .list .item uni-text.name[data-v-01bb5a67]{-webkit-box-flex:0.6;-webkit-flex:0.6;-ms-flex:0.6;flex:0.6;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;margin-right:%?35?%}.veriy .info .list .item uni-text.count[data-v-01bb5a67]{-webkit-box-flex:0.2;-webkit-flex:0.2;-ms-flex:0.2;flex:0.2}.veriy .info .list .item uni-text.price[data-v-01bb5a67]{-webkit-box-flex:0.2;-webkit-flex:0.2;-ms-flex:0.2;flex:0.2;text-align:right}",""])},d132:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="token",o="",a=function(){return uni.getStorage({key:n,success:function(e){o=e.data}}),o},r=function(e){uni.setStorage({key:n,data:e,success:function(){}})},c=function(){uni.removeStorage({key:n,success:function(e){console.log(e)}})},s=function(e,t,i){var n=parseInt(new Date(new Date(e+"/"+t+"/"+i).getTime()).getDay()),o=uni.getStorageSync("thisYear");if(e-o.y==0)if(t-o.m==0){if(i-o.d==1)return"明天";if(i-o.d==2)return"后天";switch(n){case 1:return"周一";case 2:return"周二";case 3:return"周三";case 4:return"周四";case 5:return"周五";case 6:return"周六";case 0:return"周天"}}else switch(n){case 1:return"周一";case 2:return"周二";case 3:return"周三";case 4:return"周四";case 5:return"周五";case 6:return"周六";case 0:return"周天"}},l=function(e){var t=e.split("T")[0],i=t.split("-")[1],n=t.split("-")[2];return i+"-"+n},u=function(e){return e.toFixed(2)},d={getToken:a,setToken:r,removeToken:c,judgeWeek:s,interceptMonth:l,toFix:u};t.default=d},dc4d:function(e,t,i){"use strict";i.r(t);var n=i("85ee"),o=i("41d7");for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);i("26e1");var r=i("2877"),c=Object(r["a"])(o["default"],n["a"],n["b"],!1,null,"01bb5a67",null);t["default"]=c.exports}}]);
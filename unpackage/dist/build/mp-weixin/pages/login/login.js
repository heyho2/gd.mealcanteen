(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"00a6":function(t,e,n){},"0344":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"2e47":function(t,e,n){"use strict";var o=n("00a6"),a=n.n(o);a.a},6905:function(t,e,n){"use strict";(function(t){n("9112"),n("921b");o(n("66fd"));var e=o(n("d1fa"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7aaa":function(t,e,n){"use strict";n.r(e);var o=n("aeb1"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},aeb1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("d132")),a=r(n("af2a")),i=r(n("7d17"));function r(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{loading:!1,phone:"",password:"",errorText:"",option:null}},onShow:function(){t.getNetworkType({success:function(e){console.log(e.networkType),"none"==e.networkType&&t.reLaunch({url:"/pages/notNetwork/notNetwork"})}})},onLoad:function(t){this.option=t},watch:{phone:function(t){t&&(this.errorText="")},password:function(t){t&&(this.errorText="")}},methods:{defaultHandlerLogin:function(){var e=this;this.$api.SystemTime().then(function(e){console.log(e.data);var n={y:new Date(e.data).getFullYear(),m:new Date(e.data).getMonth()+1,d:new Date(e.data).getDate()};t.setStorage({key:"thisYear",data:n,success:function(){}})}).catch(function(t){}),this.checkPhone()&&this.checkPwd()&&(this.loading=!0,setTimeout(function(t){e.loading=!1},1500),this.$api.Login({userName:this.phone,password:a.default.hexMD5(this.password).toUpperCase()}).then(function(n){0==n.code?(t.setStorage({key:"userName",data:e.phone,success:function(){}}),o.default.setToken(n.data.token),e.option?t.navigateTo({url:"/pages/index/index"}):t.navigateBack({delta:1}),t.showToast({icon:"none",title:"登录成功",duration:1500})):t.showToast({icon:"none",title:n.message,duration:1500})}).catch(function(t){}))},checkPhone:function(){return!i.default.isEmpty(this.phone)||(this.errorText="账号不能为空！",!1)},checkPwd:function(){return i.default.isEmpty(this.password)?(this.errorText="密码不能为空！",!1):!!i.default.length(this.password,6,20)||(this.errorText="密码为6-20位",!1)}}};e.default=u}).call(this,n("543d")["default"])},d1fa:function(t,e,n){"use strict";n.r(e);var o=n("0344"),a=n("7aaa");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("2e47");var r=n("2877"),u=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=u.exports}},[["6905","common/runtime","common/vendor"]]]);
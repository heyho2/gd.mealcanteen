import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 获取系统时间
export const SystemTime = (data) => {
    return http.request({
        url: 'Common/SystemTime',
        method: 'GET', 
        data,
    })
}


// 获取已预订菜品列表
export const GetBookMealListAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/GetBookMealListAsync',
        method: 'GET', 
        data,
    })
}

// 获取分类（如早中晚餐）
export const GetCategoryListAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/GetCategoryListAsync',
        method: 'GET', 
        data,
    })
}

// 获取已填日期
export const GetUseFullDateListAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/GetUseFullDateListAsync',
        method: 'GET', 
        data,
    })
}

// 扫码验证
export const ScanToGetDisheAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/ScanToGetDisheAsync',
        method: 'GET', 
        data,
    })
}

// 菜品维护-查询
export const GetDisheMaintenanceAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/GetDisheMaintenanceAsync',
        method: 'GET', 
        data,
    })
}


// 菜品维护-查询已选
export const GetCheckedDisheMaintenanceAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/GetCheckedDisheMaintenanceAsync',
        method: 'GET', 
        data,
    })
}

// 菜品维护-添加
export const AddDisheMaintenanceAsync = (data) => {
    return http.request({
        url: 'meal/MealCanteen/AddDisheMaintenanceAsync',
        method: 'POST', 
        data,
    })
}

// 修改密码
export const MealOperatorUpdatePassword = (data) => {
    return http.request({
        url: 'meal/MealCanteen/MealOperatorUpdatePassword?password='+data,
        method: 'POST'
    })
}
 // 食堂端登录
 export const Login = (data) => {
     return http.request({
         url: 'meal/MealCanteen/Login',
         method: 'POST', 
         data,
     })
 }


// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
    SystemTime,
	GetBookMealListAsync,
	GetCategoryListAsync,
	GetUseFullDateListAsync,
	ScanToGetDisheAsync,
	GetDisheMaintenanceAsync,
	GetCheckedDisheMaintenanceAsync,
	AddDisheMaintenanceAsync,
	MealOperatorUpdatePassword,
	Login
}
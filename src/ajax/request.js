import { post3, post2, post, get, get2, put, patch, Delete } from './const'

var token = localStorage.getItem('token')
var Url = 'https://api.fa-zai.com/upload/'
    //获取订单统计
export function orderSummary(params) {
    return get('/fazai-manager/order/statistics', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//获取订单列表
export function orderList(params) {
    return get('/fazai-manager/order', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单委托补充
export function orderAdditional(id, params) {
    return post('/fazai-manager/order/additional/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单开始处理
export function orderResolve(id, params) {
    return put('/fazai-manager/order/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单取消处理(普通客服)
export function orderStopResolve(id, params) {
    return put('/fazai-manager/order/cancel-handle/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单取消处理(客服主管)
export function orderStopResolve2(id, params) {
    return put('/fazai-manager/order/cancel-handle/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}

//创建退单申请
export function orderCancel(params) {
    return post('/fazai-manager/order-return', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单详情
export function orderDetail(id) {
    return get2('/fazai-manager/order/' + id, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单详情
export function orderDetail2(id) {
    return get2('/fazai-manager/order/' + id, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}

//委托单独推送
export function orderPushOne(id, oid, params) {
    return post('/fazai-manager/order-push/' + id + '/' + oid, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//委托范围推送
export function orderPushs(oid, params) {
    return post('/fazai-manager/order-push/many/' + oid, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//新增订单跟踪记录
export function orderRecord(id, params) {
    return post('/fazai-manager/order/record/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//推送处理
export function orderPush(oid, params) {
    return put('/fazai-manager/order-push/many/' + oid, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}


//手机号搜索律师
export function orderPhoneSearch(params) {
    return get('/fazai-manager/order-push', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台律师库搜索
export function lawyerSearch(params) {
    return get('/fazai-manager/lawyerLibrary/search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台律师库筛选
export function lawyerFilter(params) {
    return get('/fazai-manager/lawyerLibrary/listFilter', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台律师库所有服务
export function lawyerLibraryService(params) {
    return get('/fazai-manager/lawyerLibrary/listServices', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台律师库所有专业
export function lawyerLibraryFocus(params) {
    return get('/fazai-manager/lawyerLibrary/listBusiness', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台律师库列表
export function lawyerLibraryList(params) {
    return get('/fazai-manager/lawyerLibrary/list', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台律师库详情
export function lawyerLibraryDetail(id, params) {
    return get('/fazai-manager/lawyerLibrary/info/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//普通订单搜索
export function orderSearch(params) {
    return get('/fazai-manager/order/search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单进度详情
export function orderProgress(id) {
    return get2('/fazai-manager/order/progress/' + id, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单报价列表
export function orderPriceList(id, params) {
    return get('/fazai-manager/lawyer-quotes/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师调解搜索
export function lawyerMediationSearch(params) {
    return get('/fazai-manager/lawyerMediation/search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//获取律师合作审核列表
export function getLawyerReviewList(params) {
    return get('/fazai-manager/lawyer/review', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//处理审核律师
export function resolveLawyer(id, params) {
    return patch('/fazai-manager/lawyer/review/takeover/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师平台库筛选律师
export function filterLawyer(params) {
    return patch('/fazai-manager/lawyerLibrary/listFilter', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单报价推送
export function pricePush(id, status, params) {
    return put('/fazai-manager/lawyer-quotes/' + id + '/push/' + status, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//订单报价推荐
export function priceRecommend(id, status, params) {
    return put('/fazai-manager/lawyer-quotes/' + id + '/recommend/' + status, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师服务详情
export function lawyerService(id, params) {
    return post('/fazai-manager/push/notify/lawyer/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//平台已有评价
export function getEvaluation(params) {
    return get('/fazai-manager/lawyerLibrary/getEvaluation', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师平台库提交评价
export function saveEvaluation(id, params) {
    return put('/fazai-manager/lawyerLibrary/saveEvaluation?lawyerId=' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师平台库获取价格
export function referencePrice(id, params) {
    return put('/fazai-manager/lawyerLibrary/referencePrice?lawyerId=' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师平台库设置价格
export function setPrice(params) {
    return put('/fazai-manager/lawyerLibrary/savePrice', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//申请退单列表
export function getCancelList(params) {
    return get('/fazai-manager/order-return', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}

//允许退单
export function allowCancel(id, params) {
    return get('/fazai-manager/order-return/allow/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}

//拒绝退单
export function refuseCancel(id, params) {
    return get('/fazai-manager/order-return/reject/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}

//开始处理退单
export function startCancel(id, params) {
    return put('/fazai-manager/order-return/handle/' + id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}
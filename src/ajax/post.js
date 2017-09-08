import { post3, post2, post, get, get2, put, patch , Delete } from './const'

// var tokenPTKF = localStorage.getItem('tokenPTKF');

// export function commonApi(params) {
//   var token = localStorage.getItem('token')
//   return post('http://101.37.34.55:8082/common/api', params,token)
//   return post('http://192.168.0.126:8082/common/api', params,token)
//   return post('/common/api', params,token)
// }


//登陆
export function login(params) {
  return post('/fazai-manager/sys-user/login', params, 'application/x-www-form-urlencoded')
}
//平台账号列表（管理员）
export function sysUser(params) {
  return get('/fazai-manager/sys-user', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}
//锁定账号(管理员)
export function lock(id,params) {
  return put('/fazai-manager/sys-user/lock/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}
//解锁账号(管理员)
export function unlock(id,params) {
  return put('/fazai-manager/sys-user/unlock/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}
//修改账号信息(管理员)
export function modifysysUser(id,params) {
  return put('/fazai-manager/sys-user/'+id, params, 'application/json', localStorage.getItem('tokenGLY'))
}
//创建账号(管理员)
export function addsysUser(params) {
  return post('/fazai-manager/sys-user', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//获取用户列表（管理员，财务）
export function user(params) {
  return get('/fazai-manager/user', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//新增用户(管理员)
export function addUser(params) {
  return post('/fazai-manager/user', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//修改用户信息（管理员）
export function modifyUser(id,params) {
  return put('/fazai-manager/user/'+id, params, 'application/json', localStorage.getItem('tokenGLY'))
}

//用户黑名单操作（管理员）
export function blacklist(id,status,params) {
  return put('/fazai-manager/user/blacklist/' + id + '/' + status, params, 'multipart/form-data', localStorage.getItem('tokenGLY'))
}

//用户黑名单搜索（管理员）
export function blackSearch(params) {
  return get('/fazai-manager/user/blacklist', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//获取律师列表（管理员）
export function lawyer(params) {
  return get('/fazai-manager/lawyer', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//设置为合作律师（管理员）
export function copLawyer(id,type,params) {
  return put('/fazai-manager/lawyer/'+id+'/type/'+ type, params, 'application/json', localStorage.getItem('tokenGLY'))
}

//擅长专业列表
export function businessList(params) {
  return get('/v1/lawyer/business', params, 'application/x-www-form-urlencoded', localStorage.getItem('token'))
}

//擅长服务列表
export function servicesList(params) {
  return get('/v1/lawyer/services', params, 'application/x-www-form-urlencoded', localStorage.getItem('token'))
}

//新增律师（管理员）
export function addLawyer(params) {
  return post2('/fazai-manager/lawyer', params, 'application/json', localStorage.getItem('tokenGLY'))
}

//获取律师信息（管理员）
export function getLawyer(id,params) {
  return get('/fazai-manager/lawyer/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//修改律师信息（管理员）
export function modifyLawyer(id,params) {
  return patch('/fazai-manager/lawyer/'+id, params, 'application/json', localStorage.getItem('tokenGLY'))
}

//律师搜索（管理员）
export function searchLawyer(params) {
  return get('/fazai-manager/lawyer/search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//用户搜索(管理员，财务)
export function searchUser(params) {
  return get('/fazai-manager/user/search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenGLY'))
}

//获取我的咨询列表（普通客服）
export function consult(params) {
  return get('/fazai-manager/consult', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//处理我的咨询（普通客服）
export function takeover(id,params) {
  return patch('/fazai-manager/consult/takeover/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//获取我的咨询详情（普通客服）
export function getConsult(id,params) {
  return get('/fazai-manager/consult/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//提交我的咨询回复（普通客服）
export function giveConsult(id,params) {
  return patch('/fazai-manager/consult/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//取消咨询（普通客服）
export function disableConsult(id,params) {
  return patch('/fazai-manager/consult/disable/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//处理为无效咨询（普通客服）
export function cancelConsult(id,params) {
  return patch('/fazai-manager/consult/cancel/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//完成我的咨询（普通客服）
export function finishConsult(id,params) {
  return patch('/fazai-manager/consult/finish/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//取消全部咨询(普通客服)
export function disableAll(params) {
  return patch('/fazai-manager/consult/disableAll', params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//获取发在保障列表(普通客服)
export function feedback(params) {
  return get('/fazai-manager/feedback', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//处理法在保障(普通客服)
export function feedTakeover(id,params) {
  return patch('/fazai-manager/feedback/takeover/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//获取法在保障详情(普通客服)
export function getFeedback(id,params) {
  return get('/fazai-manager/feedback/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//回复法在保障(普通客服)
export function giveFeedback(id,params) {
  return patch('/fazai-manager/feedback/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//取消法在保障处理(普通客服)
export function cancelFeedback(id,params) {
  return patch('/fazai-manager/feedback/cancel/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//完成法在保障(普通客服)
export function finishFeedback(id,params) {
  return patch('/fazai-manager/feedback/finish/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//获取普通/合作律师审核列表(普通客服)
export function reviewLawyer(params) {
  return get('/fazai-manager/lawyer/review', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//处理审核律师(普通客服)
export function lawyerTakeover(id,params) {
  return patch('/fazai-manager/lawyer/review/takeover/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//获取律师详情(普通客服)
export function getReviewLawyer(id,params) {
  return get('/fazai-manager/lawyer/review/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//通过审核(普通客服)
export function passLawyer(id,params) {
  return patch('/fazai-manager/lawyer/review/pass/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//拒绝通过审核(普通客服)
export function denyLawyer(id,params) {
  return Delete('/fazai-manager/lawyer/review/deny/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//诉讼保全列表(普通客服)
export function preservation(params) {
  return get('/fazai-manager/litigationPreservation', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//诉讼保全处理(普通客服)
export function preservationTakeover(id,params) {
  return put('/fazai-manager/litigationPreservation/handle/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//诉讼保全取消处理(普通客服)
export function preservationCancel(id,params) {
  return put('/fazai-manager/litigationPreservation/cancel/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//诉讼保全详情(普通客服)
export function getPreservation(id,params) {
  return get('/fazai-manager/litigationPreservation/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}
//诉讼保全保存(普通客服)
export function preservationSave(id,params) {
  return put('/fazai-manager/litigationPreservation/save/'+id, params, 'multipart/form-data', localStorage.getItem('tokenPTKF'))
}
//诉讼保全完成(普通客服)
export function preservationFinish(id,params) {
  return post2('/fazai-manager/litigationPreservation/finish/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}

//律师调解列表(普通客服)
export function Mediation(params) {
  return get('/fazai-manager/lawyerMediation', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师调解处理(普通客服)
export function mediationTakeover(id,params) {
  return put('/fazai-manager/lawyerMediation/handle/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师调解取消处理(普通客服)
export function mediationCancel(id,params) {
  return put('/fazai-manager/lawyerMediation/cancel/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师调解详情(普通客服)
export function getMediation(id,params) {
  return get('/fazai-manager/lawyerMediation/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenPTKF'))
}

//律师调解保存(普通客服)
export function mediationSave(id,params) {
  return put('/fazai-manager/lawyerMediation/save/'+id, params, 'multipart/form-data', localStorage.getItem('tokenPTKF'))
}

//律师调解完成(普通客服)
export function mediationFinish(id,params) {
  return post2('/fazai-manager/lawyerMediation/finish/'+id, params, 'application/json', localStorage.getItem('tokenPTKF'))
}




//获取内部评价列表(客服主管)
export function tagLawyer(params) {
  return get('/fazai-manager/lawyer/tag', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}

//添加内部评价标签(客服主管)
export function tagAdd(params) {
  return post2('/fazai-manager/lawyer/tag/add', params, 'application/json', localStorage.getItem('tokenKFZG'))
}

//删除内部评价标签(客服主管)
export function tagDel(id,params) {
  return Delete('/fazai-manager/lawyer/tag/delete/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenKFZG'))
}



//提现列表(财务)
export function withdrawals(params) {
  return get('/fazai-manager/withdrawals', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//提现驳回(财务)
export function withdrawalsRefuse(id,params) {
  return post('/fazai-manager/withdrawals/'+id+'/refuse', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//提现处理(财务)
export function withdrawalsWithdraw(id,params) {
  return post('/fazai-manager/withdrawals/'+id+'/withdraw', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//订单交易记录(财务)
export function orderHistory(params) {
  return get('/fazai-manager/order/history', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//套餐交易记录(财务)
export function payment(params) {
  return get('/fazai-manager/combo/payment-info', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//套餐列表(财务)
export function combo(params) {
  return get('/fazai-manager/combo', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//套餐上架(财务)
export function downUp(id,action,params) {
  return put('/fazai-manager/combo/'+id+'/'+action, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//套餐删除(财务)
export function comboDel(id,params) {
  return Delete('/fazai-manager/combo/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//新增套餐(财务)
export function comboAdd(params) {
  return post2('/fazai-manager/combo', params, 'application/json', localStorage.getItem('tokenCW'))
}

//获取套餐信息(财务)
export function getCombo(id,params) {
  return get('/fazai-manager/combo/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//修改套餐信息(财务)
export function comboModify(id,params) {
  return put('/fazai-manager/combo/'+id, params, 'application/json', localStorage.getItem('tokenCW'))
}

//套餐办理(财务)
export function comboHandle(comboId,id,params) {
  return put('/fazai-manager/combo/'+comboId+'/handle/'+id, params, 'application/json', localStorage.getItem('tokenCW'))
}

//线下核销用户搜索(财务)
export function getSearch(params) {
  return get('/fazai-manager/combo/user-search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//用户套餐列表(财务)
export function getUserCombo(id,params) {
  return get('/fazai-manager/user/'+ id +'/combo', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//套餐核销(财务)
export function verification(id,params) {
  return post2('/fazai-manager/combo/verification-sheet/'+id, params, 'application/json', localStorage.getItem('tokenCW'))
}

//核销记录列表(财务)
export function getVerification(params) {
  return get('/fazai-manager/combo/verification-sheet', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//退单记录列表(财务)
export function listRefund(params) {
  return get('/fazai-manager/order-return/listRefund', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//退单记录搜索(财务)
export function searchRefund(params) {
  return get('/fazai-manager/order-return/searchRefund', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenCW'))
}

//确认退款(财务)
export function confirmedRefund(id,params) {
  return put('/fazai-manager/order-return/confirmedRefund/'+id, params, 'application/json', localStorage.getItem('tokenCW'))
}










//文章列表(运营)
export function article(params) {
  return get('/fazai-manager/article', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenYY'))
}

//新增文章
export function articleAdd(params) {
  return post2('/fazai-manager/article', params, 'application/json', localStorage.getItem('tokenYY'))
}

//文章详情(运营)
export function getArticle(id,params) {
  return get('/fazai-manager/article/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenYY'))
}

//修改文章(运营)
export function articleMod(id,params) {
  return patch('/fazai-manager/article/'+id, params, 'application/json', localStorage.getItem('tokenYY'))
}

//删除文章(运营)
export function articleDel(id,params) {
  return Delete('/fazai-manager/article/'+id, params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenYY'))
}

//发布文章(运营)
export function articlePush(params) {
  return post2('/fazai-manager/post', params, 'application/json', localStorage.getItem('tokenYY'))
}

//已发布文章列表(运营)
export function postArticle(params) {
  return get('/fazai-manager/post', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenYY'))
}

//删除已发布文章 (运营)
export function postDel(id,params) {
  return Delete('/fazai-manager/post/'+id, params, 'application/json', localStorage.getItem('tokenYY'))
}

//搜索文章(运营)
export function searchArticle(params) {
  return get('/fazai-manager/article/search', params, 'application/x-www-form-urlencoded', localStorage.getItem('tokenYY'))
}

//修改已发布文章 (运营)
export function pusharticleMod(id,params) {
  return patch('/fazai-manager/post/'+id, params, 'application/json', localStorage.getItem('tokenYY'))
}






























export const uploadFactory = function(imgId) {
    var state = {
        uploading: false
    }
    return {
        state: state,
        callback: function(field_name, url, type, win) {
            if(type=='image') {
                $('#' + field_name).attr('placeholder', '上传中...')
                var $img = $('#' + imgId)
                if (state.uploading) {
                    alert('请等待现有一张图片上传')
                    return
                }
                $img.click()
                $img.unbind('change')
                $img.on('change', function(e){
                    var file = e.target.files[0]
                    var formData = new FormData()
                    state.uploading = true
                    formData.append('pictureUrl', file)
                    Promise.resolve($.ajax({
                        url: '/picture/uploadArticle.do',
                        data: formData,
                        type: "POST",
                        processData: false,
                        contentType: false,
                        cache: false
                    })).then(function(res){
                        console.log(res)
                        // res = JSON.parse(res)
                        $('#' + field_name).val(res.data)
                        $('#' + field_name).attr('placeholder', '')
                       state.uploading = false
                    })
                })
            }
        } 
    }
}


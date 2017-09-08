<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style lang="less">
  #app {
    min-width: 1200px;
  }

  .login-bg {
    //登录页样式
    position: relative;
    .login-main {
      width: 100%;
      background: url('./assets/image/background.jpg');
      background-size: 100% 100%;
      position: relative;
    }
  }

  .list-bg {
    .left-col {
      //菜单左边
      .el-menu-item {
        text-align: center;
      }
    }
    .right-col {
      //菜单右边
      border-left: 1px solid #eee;
      padding: 15px;
    }
  }

  .item-header {
    //菜单右侧内容标题
    font-size: 16px;
    color: #666666;
    font-weight: bold;
  }

  .search {
    //搜索框
    float: right;
    width: 300px;
    z-index: 20;
  }

  .table-label-button {
    //表头按钮
    position: absolute;
    z-index: 5;
    right: 4vw;
    top: 7px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #42bd56;
    text-align: center;
    display: inline-block;
    border: 1px solid #42bd56;
  }


  .detail-header {
    //详情内头区域块
    padding: 10px 5px 20px;
    border-bottom: 1px solid #eee;
  }


  .detail-main {
    //详情内区域快
    padding: 20px 5px;
    position: relative;
    border-bottom: 1px solid #eee;
  }


  .detail-save-bg {
    //保存按钮
    height: 40px;
    margin-top: 10px;
    .detail-save {
      float: right;
    }
  }

  .detail-main-button {
    //联系按键
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .detail-main-button1 {
    position: absolute;
    bottom: 20px;
    right: 120px;
  }

  .right-time {
    //详情里的时间
    font-size: 14px;
    color: #999;
    text-align: right;
  }

  .dealList .cell,
  .el-table th>div {
    padding-left: 0;
    padding-right: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

  .dialog-title {
    //弹窗标题
    text-align: center;
    font-size: 18px;
    color: #42bd56;
  }

  .dialog-title2 {
    //弹窗2级标题
    text-align: center;
    font-size: 16px;
    color: #999999;
  }

  .dialog-title3 {
    //弹窗3级标题
    margin: 10px 0;
    font-weight: bold;
    font-size: 16px;
  }

  .table-bg {
    //列表上方的距离
    margin-top: 15px;
  }

  .indexList-bg {
    //未选择的表格内容
    margin: 30px;
    width: 30vw;
    height: 47vh;
    font-size: 14px;
    text-align: center;
    .el-row-header {
      height: 7vh;
      background: #eee;
      line-height: 7vh;
    }
    .el-row-content {
      height: 10vh;
      line-height: 10vh;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .first {
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
      }
    }
  }

  .detail-tag {
    //详情里的标签
    margin: 10px 10px 0;
    display: inline-block;
    width: 100px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #666;
    text-align: center;
    border: 1px solid #666;
  }

  .detail-tag-first {
    //详情里的第一个标签
    margin-left: 7vw;
  }

  .platAdmin-form .el-form-item {
    //弹窗中表单间距
    margin-bottom: 10px;
  }

  .dealList1 .cell,
  .el-table th>div {
    //表头太靠近边框的样式调整
    padding-left: 10px;
    padding-right: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

  .deleteList-danger {
    //警告样式
    font-size: 14px;
    color: #e62222;
  }

  .dialog-radio:first-child {
    //弹窗中的样式
    margin-left: 20px;
    margin-top: 10px;
  }

  .dialog-radio+.dialog-radio {
    margin-left: 20px;
    margin-top: 10px;
  }

  .dialog-radio:last-child {
    margin-bottom: 10px;
  }

  .item-radio-button:first-child .el-radio-button__inner,
  .item-radio-button:last-child .el-radio-button__inner {
    //单选按钮的分离样式
    border-radius: 0;
  }

  .item-radio-button .el-radio-button__inner {
    //单选按钮的分离样式
    margin-top: 10px;
    margin-right: 10px;
    border: 1px solid #bfcbd9;
  }

</style>

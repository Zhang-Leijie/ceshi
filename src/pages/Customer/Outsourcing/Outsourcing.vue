<template>
  <div>
    <h1 class="item-header">法务外包</h1>
    <el-input placeholder="搜索姓名/手机号" style="width:200px" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input>
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="平台受理" name="first"></el-tab-pane>
      <el-tab-pane label="优惠支付" name="second"></el-tab-pane>
      <el-tab-pane label="律师服务" name="third"></el-tab-pane>
      <el-tab-pane label="评价律师" name="fourth"></el-tab-pane>
      <el-tab-pane label="服务完成" name="fifth"></el-tab-pane>
      <el-tab-pane label="委托终止" name="sixth"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  import {orderSearch} from '@/ajax/request.js'
  export default {
    data() {
      return {
        message: '',
        active: ' '
      }
    },
    methods: {
      search() {
         orderSearch({
          keyword:this.message,
          type:1
        }).then((res)=>{
          if(res.code == 200){
            this.data = res.data
          }
        })
        console.log("这里是搜索内容")
      },
      tabClick() {
        const name = this.active
        switch (name) {
          case "first":
            router.push({
              name: "OutsourcingPlatform"
            })
            break
          case "second":
            router.push({
              name: "OutsourcingOfferPrice"
            })
            break
          case "third":
            router.push({
              name: "OutsourcingService"
            })
            break
          case "fourth":
            router.push({
              name: "OutsourcingEvaluation"
            })
            break
          case "fifth":
            router.push({
              name: "OutsouringComplete"
            })
            break
          default:
            router.push({
              name: "OutsouringEnd"
            })
            break
        }
      }
    }
  }

</script>
<style lang="less">


</style>

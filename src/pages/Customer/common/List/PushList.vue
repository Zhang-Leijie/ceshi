<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回</el-button>
      <el-button size="small" @click="isRecording=true">提交记录</el-button>
    </div>
    <el-table :data="list" style="width:100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="法律意见：">   
              <span>{{props.row.comment}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="70"></el-table-column>
      <el-table-column label="手机号" prop="phone" width="130"></el-table-column>
      <el-table-column label="职业地区" prop="address" width="90"></el-table-column>
      <el-table-column label="职业年限" prop="year" width="100"></el-table-column>
      <el-table-column label="报价" width="100">
        <template scope="scope">
          <span style="color:#e62222">{{scope.row.money/1000}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="" v-if="id== 1">
        <template scope="scope">
          <el-button v-show="scope.row.show==0" type="primary"  size="small" @click="pushPrice(scope.row.id,1)">推送</el-button>
          <el-button v-show="scope.row.show==1" type="danger"  @click="pushPrice(scope.row.id,0)" size="small">取消推送</el-button>
          <el-button v-show="scope.row.recommend==0" type="primary" @click="recommend(scope.row.id,1)" size="small">推荐</el-button>
          <el-button v-show="scope.row.recommend==1" type="danger" @click="recommend(scope.row.id,0)" size="small">取消推荐</el-button>
        </template>
      </el-table-column>
      <el-table-column label="" v-if="id != 1">
        <template scope="scope">
          <el-button :disabled="disabled" v-show="scope.row.show==0" type="danger"  size="small">推送</el-button>
          <el-button :disabled="disabled" v-show="scope.row.show==1" type="primary"  size="small">取消推送</el-button>
          <el-button :disabled="disabled" v-show="scope.row.recommend==0" type="danger"  size="small">推送报价</el-button>
          <el-button :disabled="disabled" v-show="scope.row.recommend==1" type="primary"  size="small">取消推送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <text-dialog title="提交记录" content="请输入记录内容" type="记录" :open.sync="isRecording" @submit="recording"></text-dialog>
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="intotal">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { orderPriceList,priceRecommend,pricePush,orderRecord } from '@/ajax/request.js'
  import data from '@/assets/json/common2.json'
  import TextDialog from '@/components/TextDialog.vue'
  export default {
    components: {
      TextDialog
    },
    data() {
      return {
        list: [], //列表数据
        status: 0, //订单所处的状态
        intotal:0,
        id:this.$route.query.id,
        isRecording: false //判断弹窗
      }
    },
    methods: {
      onCancel() {
        router.push({
          name: "CommonDetail"
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      //提交订单
      recording(val) {
        orderRecord(this.status,{
          content: val
        }).then((res)=>{
            if(res.code == 200){
              this.$message(res.msg)
            }
        })
        this.isRecording = false
      },
      //推送报价
      pushPrice(id,status) {
        pricePush(id,status).then((res)=>{
          if(res.code == 200){

          }
        })
      },

      //推荐
      recommend(id,status) {
        priceRecommend(id,status).then((res)=>{
          if(res.code == 200){

          }
        })
      },

      //取消推送
      cancelPush(obj, index) {
        obj.status = 0
        this.$set(this.list, index, obj)
      },

      //获取报价列表
      getPriceList(id){
        orderPriceList(id).then((res)=>{
          if(res.code == 200){
            this.list = res.data.list
            this.intotal = res.data.count
          }
        })
      }
    },
    mounted() {
      this.status = this.$route.params.status
      this.getPriceList(this.status)
    }
  }

</script>
<style lang="less">


</style>

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
            <el-form-item label="执业机构">
              <span>杭州律师事务所</span>
            </el-form-item>
            <el-form-item label="法律意见：">
              <span>您的委托提交后，平台将在第一时间推送给匹配的专业律师，您的委托提交后，平台将在第一时间推送给匹配的专业律师，您的委托提交后，平台将在第一时间推送给匹配的专业律师</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="70"></el-table-column>
      <el-table-column label="手机号" prop="phone" width="130"></el-table-column>
      <el-table-column label="职业地区" prop="address" width="90"></el-table-column>
      <el-table-column label="职业年限" prop="years" width="100"></el-table-column>
      <el-table-column label="报价" width="100">
        <template scope="scope">
          <span>{{scope.row.price}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template scope="scope">
          <span :style="{'color':getColor(scope.row.status)}">{{getStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <text-dialog title="提交记录" content="请输入记录内容" type="记录" :open.sync="isRecording" @submit="recording"></text-dialog>
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
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
        isRecording: false //判断弹窗
      }
    },
    methods: {
      //获取状态颜色
      getColor(num) {
        if (num == 2) {
          return "#999999"
        } else {
          return "#42bd56"
        }
      },

      //获取订单状态
      getStatus(num) {
        switch (num) {
          case 1:
            return "推送报价"
          case 2:
            return "已推送"
          default:
            return "未推送"
        }
      },

      onCancel() {
        router.push({
          name: "OrderDetail"
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
        console.log("recording")
        this.isRecording = false
      }
    },
    mounted() {
      this.list = data.lawyers
    }
  }

</script>
<style lang="less">


</style>

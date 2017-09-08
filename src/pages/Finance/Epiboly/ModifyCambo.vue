<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" @click="save">保存</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="套餐信息"></infor-title>
      <infor title="套餐名称">
        <el-input v-model="cambo.name" size="mini" slot="con" class="cambo-input"></el-input>
      </infor>
      <infor title="套餐原价">
        <el-input type="number" v-model="cambo.price" size="mini" slot="con" class="cambo-input" :controls="false"></el-input>
      </infor>
      <infor title="销售价格">
        <template slot="con">
          <el-input v-model="cambo.nowPrice" size="mini" class="cambo-input"></el-input>
          <span style="color:#e62222">*这是用户实际付款金额</span>
        </template>
      </infor>
      <infor title="有效期">
        <el-select v-model="cambo.time" placeholder="请选择" slot="con" class="cambo-input" size="mini">
          <el-option v-for="(item,index) in options" :label="item.name" :value="item.time">
          </el-option>
        </el-select>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="服务折扣设置">
        <h1 slot="title-content" class="detail-title-left">（0表示不限次数）
          <el-button type="primary" size="small" @click="isAdd = true">添加+</el-button>
        </h1>
      </infor-title>
      <el-row v-for="(item,index) in services" :key="item.name">
        <el-col :span="9">
          <infor :title="item.name" :first="10">
            <el-input-number v-model="item.num" size="mini" slot="con" :controls="false"></el-input-number>
          </infor>
        </el-col>
        <el-col :span="15">
          <infor title="服务说明">
            <template slot="con">
              <el-input v-model="item.explain" size="mini" class="cambo-input"></el-input>
              <el-button type="danger" size="mini" @click="deleteSer(index)">删除</el-button>
            </template>
          </infor>
        </el-col>
      </el-row>
    </div>

    <div class="detail-main">
      <infor-title title="免费服务次数设置">
        <h1 slot="title-content" class="detail-title-left">（0表示不限次数）
          <!-- <el-button type="primary" size="small" :disabled="true">添加+</el-button> -->
          <el-button type="primary" size="small" @click="isAdd2 = true">添加+</el-button>
        </h1>
      </infor-title>
      <el-row v-for="(item,index) in discounts" :key="item.name">
        <el-col :span="9">
          <infor :title="item.name" :first="10">
            <el-input-number v-model="item.num" size="mini" slot="con" :controls="false"></el-input-number>
          </infor>
        </el-col>
        <el-col :span="15">
          <infor title="服务说明">
            <template slot="con">
              <el-input v-model="item.explain" size="mini" class="cambo-input"></el-input>
              <el-button type="danger" size="mini" @click="deleteFree(index)">删除</el-button>
            </template>
          </infor>
        </el-col>
      </el-row>
    </div>

    <el-dialog :visible="isAdd2" size="small" :show-close="false">
      <h1 slot="title" class="dialog-title">添加项目</h1>
      <el-radio-group v-model="serviceId">
        <el-radio-button v-for="(item,index) in sers" :disabled="getAble(item.id)" :label="item.id"  class="item-radio-button" @click.native="chooseName(item.name)">{{item.name}}</el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAdd2 = false;serviceId = '';serviceName = '';">取消</el-button>
        <el-button type="primary" style="margin-left:20px" @click="saveRadio2">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="isAdd" size="small" :show-close="false">
      <h1 slot="title" class="dialog-title">添加项目</h1>
      <el-radio-group v-model="serviceId">
        <el-radio-button v-for="(item,index) in sers" :disabled="getAble(item.id)" :label="item.id"  class="item-radio-button" @click.native="chooseName(item.name)">{{item.name}}</el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAdd = false;serviceId = '';serviceName = ''">取消</el-button>
        <el-button type="primary" style="margin-left:20px" @click="saveRadio">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import { getCombo , comboModify } from '@/ajax/post.js'


  export default {
    components: {
      Infor,
      InforTitle
    },
    data() {
      return {
        content:"",
        status: 0,
        options: [
          // {"无限制"}, 
          {name:"一天",time:60*60*24}, 
          {name:"三天",time:60*60*24*3},
          {name:"一周",time:60*60*24*7}, 
          {name:"一个月",time:60*60*24*30}, 
          {name:"三个月",time:60*60*24*30*3}, 
          {name:"六个月",time:60*60*24*30*6}, 
          {name:"一年",time:60*60*24*30*12}, 
          // {"自定义天数"}
        ],
        cambo: {
          name: "",
          price: "",
          nowPrice: "",
          time: ""
        },
        services: [],

        discounts: [],

        isAdd: false,
        isAdd2: false,

        sers: [
          {name:"合同审核",id:1}, 
          {name:"合同起草",id:2}, 
          {name:"发律师函",id:3}, 
          {name:"代写诉状",id:4}, 
          {name:"其他文书",id:5}, 
          {name:"律师见证",id:6}, 
          {name:"股权设计",id:7}, 
          {name:"诉讼仲裁",id:8}, 
          {name:"刑事会见",id:9}, 
          {name:"刑事辩护",id:10},
          {name:"付费咨询",id:11},
          {name:"请教问题",id:12},
          {name:"异地查档",id:13},
        ],
        serviceId: "", //所选项目id
        serviceName:"", //所选项目name
      }
    },
    methods: {
      getCombo(){
        var self = this;
        getCombo(this.$route.query.id,{}).then((res) => {
          if (res.code == 200) {
            this.info = res.data;
            this.content = JSON.parse(res.data.content);
            this.cambo = {
              name: res.data.name,
              price: (res.data.price/100).toFixed(2),
              nowPrice: (res.data.promotion/100).toFixed(2),
              time: res.data.expiration_date,
            };
            this.content.sale.forEach(function(list){
              self.services.push({
                name: self.getName(list.order_type),
                num: list.number,
                id: list.order_type,
                explain: list.description,
              })
            });
            this.content.free.forEach(function(list){
              self.discounts.push({
                name: self.getName(list.order_type),
                num: list.number,
                id: list.order_type,
                explain: list.description,
              })
            })
          };
        })
      },

      getName(id){
        // 订单类型：1：合同审核 2：合同起草 3：发律师函 4：代写诉状 5:其他文书 6:律师见证 7:股权设计 8:诉讼仲裁 9:刑事会见 10:刑事辩护 11:付费咨询 12:请教问题 13:异地查档
        if (id == 1) {
          return "合同审核"
        } else if(id==2){
          return "合同起草"
        } else if(id==3){
          return "发律师函"
        } else if(id==4){
          return "代写诉状"
        } else if(id==5){
          return "其他文书"
        } else if(id==6){
          return "律师见证"
        } else if(id==7){
          return "股权设计"
        } else if(id==8){
          return "诉讼仲裁"
        } else if(id==9){
          return "刑事会见"
        } else if(id==10){
          return "刑事辩护"
        } else if(id==11){
          return "付费咨询"
        } else if(id==12){
          return "请教问题"
        } else if(id==13){
          return "异地查档"
        } 
      },

      chooseName(name){
        this.serviceName = name;
      },

      cancel() { //取消
        let name = ""
        name = this.status == 1 ? "EpibolyCamboDetail" : "EpibolyCamboList"
        console.log(name)
        router.push({
          name: name,
          params: {
            status: 2
          }
        })
      },

      save() {
        var sale = [];
        var free = [];
        this.services.forEach(function(list){
          sale.push({
            number: list.num,
            unlimited: list.num == 0 ? true : false,
            order_type: list.id,
            description: list.explain,
          })
        })

        this.discounts.forEach(function(list){
          free.push({
            number: list.num,
            unlimited: list.num == 0 ? true : false,
            order_type: list.id,
            description: list.explain,
          })
        })

        comboModify(this.$route.query.id,{
          name: this.cambo.name,
          price: (this.cambo.price-0)*100,
          promotion: (this.cambo.nowPrice-0)*100,
          expiration_date: this.cambo.time,
          content:{
            free: free,
            sale: sale,
          }
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: 'success'
            });
          };
        })
      },

      //是否能动
      getAble(item) {
        let flag = false
        this.services.forEach((item1) => {
          item1.name == item && (flag = true)
        })
        return flag
      },

      //弹窗的保存
      saveRadio() {
        this.services.push({
          name: this.serviceName,
          id: this.serviceId,
          num: 0,
          explain: ""
        })
        this.serviceId = "";
        this.serviceName = "";
        this.isAdd = false
      },

      saveRadio2() {
        this.discounts.push({
          name: this.serviceName,
          id: this.serviceId,
          num: 0,
          explain: ""
        })
        this.serviceId = "";
        this.serviceName = "";
        this.isAdd2 = false
      },


      deleteSer(index) {
        //删除折扣
        this.services.splice(index, 1)
      },

      deleteFree(index) {
        //删除折扣
        this.discounts.splice(index, 1)
      }

    },
    mounted() {
      this.status = this.$route.params.status;
      this.getCombo();
    }
  }

</script>
<style>
  .cambo-input {
    width: 20vw;
  }

</style>

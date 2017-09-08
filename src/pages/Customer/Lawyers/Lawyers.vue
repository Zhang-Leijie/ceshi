<template>
  <div>
    <div class="detail-header lawyers-header" size="">
      <h1 class="item-header">平台律师库</h1>
      <el-input placeholder="搜索姓名/手机号" icon="search lawyer-search" v-model="message" :on-icon-click="search" class="search lawyers-search"
        size="small">
      </el-input>
    </div>
    <el-select  v-model="select.profession" placeholder="擅长专业" size="mini" class="lawyers-select">
      <el-option   v-for="(item,index) in professions" :key="item" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="select.service" placeholder="擅长服务" size="mini" class="lawyers-select">
      <el-option v-for="(item,index) in services" :key="item" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="selectProvince" placeholder="选择省份"  v-on:change="getProv($event)" size="mini" class="lawyers-select">
      <el-option v-for="(item,index) in provinces" :key="item"  :label="item.label" :value="item.value" >
      </el-option>
    </el-select>
    <el-select v-model="selectCity" placeholder="选择城市" size="mini" class="lawyers-select">
      <el-option  :label="item.label" :value="item.value"  v-for="(item,index) in cities" :key="item">
      </el-option>
    </el-select>
    <el-select v-model="identity" placeholder="平台身份" size="mini" class="lawyers-select">
      <el-option v-for="(item,index) in identities"  :label="item.label"  :key="item" :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" size="mini" @click="filter" class="lawyers-button">筛选</el-button>
    <el-select v-model="sorting" placeholder="列表排序" size="mini" class="lawyers-sorting">
      <el-option v-for="(item,index) in sortings" :key="item" :label="item.label" :value="item.id">
      </el-option>
    </el-select>
    <el-table :data="list" @row-click="getDetail" style="width: 100%" class="table-bg">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="lawyer-form">
            <el-form-item label="擅长专业：">
              <span class="lawyer-form-content" v-for="item in business">{{ item }}</span>
            </el-form-item>
            <el-form-item label="擅长服务：">
              <span class="lawyer-form-content" v-for="item in service">{{ item }}</span>
            </el-form-item>
            <el-form-item label="平台订单：">
              <span class="lawyer-form-content" v-for="item in data.order">{{ item.name }}({{item.number}})</span>
            </el-form-item>
            <el-form-item label="用户评价：" v-if="data.evaluate.length > 0?'true':'false'">
              <span class="lawyer-form-content">好评({{data.evaluate.praise || ''}})</span>
              <span class="lawyer-form-content">中评({{data.evaluate.mediumReview || ''}})</span>
              <span class="lawyer-form-content">差评({{data.evaluate.poorReview || ''}})</span>
              <span class="lawyer-form-content">专业能力({{data.evaluate.ability || ''}})</span>
              <span class="lawyer-form-content">服务态度({{data.evaluate.attitude || ''}})</span>
              <span class="lawyer-form-content">服务速度({{data.evaluate.speed || ''}})</span>
            </el-form-item>
            <el-form-item label="参考价格：">
              <div class="lawyer-price">
                <h1 v-for="item in data.price"  class="lawyer-form-content">{{item.name}}————<span v-for="item in item.lawyerServiceList">{{item.name}}({{item.floorPrice/1000}}——{{item.ceilingPrice/1000}})</span></h1>
                <el-button class="lawyer-price-button" type="primary" size="mini" @click="setting(props.row.id)">设置</el-button>
              </div>
            </el-form-item>
            <el-form-item label="内部评价：">
              <span v-for="item in data.tag" class="lawyer-form-content">{{item.tagName}}({{item.number}})、</span>
              <el-button type="primary" size="mini" @click="assess(props.row.id)">评价</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="律师姓名" prop="name" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="手机号" width="130" prop="phone" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="执业地区" prop="address" width="130">
      </el-table-column>
      <el-table-column label="执业律所" prop="organization" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="平台身份" prop="types" width="100"></el-table-column>
      <el-table-column label="订单数" prop="orderCount">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
      :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="intotal">
    </el-pagination>
    <el-dialog :visible.sync="isSetUpDialog" size="large" :show-close="false">
      <h1 slot="title" class="dialog-title">参考价格设置</h1>
      <el-table :data="dialogList" style="width:100%">
        <el-table-column prop="name" label="" width="120"></el-table-column>
        <el-table-column label="知识产权">
          <template scope="scope">
            <el-input-number :controls="false" size="mini" class="dialog-input" :max="999999999" />{{}}元—
            <el-input-number :controls="false" size="mini" class="dialog-input" :max="999999999" />元
          </template>
        </el-table-column>
        <el-table-column label="企业事务">
          <template scope="scope">
            <el-input-number :controls="false" size="mini" class="dialog-input" :max="999999999" />元—
            <el-input-number :controls="false" size="mini" class="dialog-input" :max="999999999" />元
          </template>
        </el-table-column>
        <el-table-column label="婚姻继承">
          <template scope="scope">
            <el-input-number :controls="false" size="mini" class="dialog-input" :max="999999999" />元—
            <el-input-number :controls="false" size="mini" class="dialog-input" :max="999999999" />元
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSetUpDialog = false">取消</el-button>
        <el-button type="primary" @click="setUp(lawyerId)">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="isAssess" size="small" :show-close="false">
      <h1 slot="title" class="dialog-title">内部评价</h1>
      <h2 slot="title" class="dialog-title2">内部评价只限工作人员查看了解，不对外展示</h2>
      <h3 class="dialog-title3">已有评价：</h3>
      <el-button type="primary" v-for="item in data.tag" @click="assessItem(item,index,assessList)">{{item.tagName}}({{item.number}})</el-button>
      <h3 class="dialog-title3" style="margin-top:30px">推荐评价：</h3>
      <el-button type="primary" v-for="(item,index) in recommendList"  @click="assessItem(item,index,recommendList)">{{`${item.name}(${item.number})`}}</el-button>
      <div>
        <el-input placeholder="此处可输入您的评价（不超过8个字）" v-model="assessContent" :maxlength="8" class="assessContent"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAssess = false">取消</el-button>
          <el-button style="margin-left:20px" type="primary" @click="save(lawyerId)">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
 import { setPrice, lawyerSearch,getEvaluation,lawyerFilter,referencePrice,saveEvaluation,lawyerLibraryService,lawyerLibraryFocus,lawyerLibraryList,lawyerLibraryDetail,filterLawyer } from '@/ajax/request.js'
  import data from '@/assets/json/lawyers.json'
    import prov from '@/assets/json/prov.json'
      import city from '@/assets/json/city.json'
  export default {
    data() {
      return {
        list: [], //数据列表
        message: "",
        page:1,
        pagesize:10,
        intotal:0,
        order:[],
        service:[],
        lawyerId:0,
        types:'',
        professions: ["所有", "医疗纠纷", "金融业务", "保险理财", "劳动人事", "人身损害", "交通事故", "知识产权", "企业事务", "婚姻继承", "房屋财产", "行政案件",
          "建筑工程", "消费维权", "债权债务", "刑事案件", "海事海商", "环境保护", "涉外事务", "财税审计"
        ],
        services: [ ],
        provinces: ["安徽省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省",
          "浙江省", "浙江省"],
        cities: ["杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市"],
        identities: [
            {
            "id":"2",
            "label":"普通律师"
          },
            {
            "id":"3",
            "label":"认证律师"
          },
          ],
        sortings: [
          {
            "id":"1",
            "label":"最低价格从低到高"
          },
          {
            "id":"2",
            "label":"最低价格从高到低"
          },
          {
            "id":"3",
            "label":"最高价格从低到高"
          },
          {
            "id":"4",
            "label":"最高价格从高到低"
          },
          ],
        value: '',
        identity:'',
        select: {
          profession: '',
          service: '',
          provinice: '',
          city: '',
          identity: ''
        },
        business:[],
        selectProvince:'',
        selectCity:'',
        data:[],
        sorting: '筛选顺序', //排序
        isSetUpDialog: false,
        isAssess: false,
        page:1,
        pagesize:10,
        dialogList: [{ //设置弹窗数据列表
          name: "合同审查"
        }, {
          name: "合同起草"
        }, {
          name: "发律师函"
        }, {
          name: "刑事会见"
        }, {
          name: "代写诉状"
        }],
        assessList: [], //评价列表
        recommendList: [{
          name: "人长得帅",
          number: 5
        }], //推荐列表
        assessContent: "" //输入评价
      }
    },
    methods: {
      //省级联动
      getProv: function (prov) {  
          let tempCity=[]; 
          this.cities=[]; 
          let allCity= city; 
          this.selectCity='';  
          for (var val of allCity){
              if (prov == val.prov){  
                    tempCity.push({label: val.label, value: val.label})  
               }  
          }  
          this.cities = tempCity;    
      },
      search() {
        lawyerSearch({
          keyword:this.message
        }).then((res)=>{
          console.log(res)
        })
        console.log("这里是搜索内容")
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.filter()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page = val
        this.filter()
        console.log(`当前页: ${val}`);
      },
      setting(id){
        referencePrice(this.lawyerId).then((res)=>{
          if(res.code == 200){

          }
        })
           this.isSetUpDialog = true
           this.lawyerId = id
      },
      //保存设置价格
      setUp() {
        setPrice(this.lawyerId
        ).then((res)=>{

        })
        this.isSetUpDialog = false
      },
      //按评价按钮的回调
      assess(id) {
        this.lawyerId = id
        this.isAssess = true
      },
      //获取律师详情
      getDetail(val){
        console.log(val)
        lawyerLibraryDetail(val.id).then((res)=>{
          if(res.code == 200){
              this.data = res.data
              this.data.tag =  [
            {
                "number": 12,
                "tagId": 50,
                "tagName": "很高"
            },
             {
                "number": 12,
                "tagId": 50,
                "tagName": "很高"
            },
             {
                "number": 12,
                "tagId": 50,
                "tagName": "很高"
            }
        ]
              this.business = res.data.business.name.split(",")
              this.service = res.data.service.name.split(",")
          }
        })
      },
      //评价按钮回调
      assessItem(item, index, list) {
        item.number = item.number + 1
        this.$set(list, index, item)
      },

      save(id) {
        if (this.assessContent) {
          this.assessList.push(this.assessContent)
          saveEvaluation(this.lawyerId).then((res) =>{

          })
        }
        this.assessContent = ""
        this.isAssess = false
      },
      //筛选律师
      filter(){
        lawyerFilter({
          page:this.page,
          pagesize:this.pagesize,
          businessId:this.select.profession,
          servicesId:this.select.service,
          address:this.selectProvince + this.selectCity,
          identity:this.identity,
          sort:this.sorting
        }).then((res)=>{
          if(res.code == 200){
            this.list = res.data.list
            this.types = res.data.list.type == 2? '普通律师' :'认证律师'
          }
        })
      },
      //平台律师库所有
      //平台律师库所有服务
      getLawyersService(){
        lawyerLibraryService().then((res)=>{
          if(res.code == 200){
            this.services = res.data
          }
        })
      },
      //平台律师库所有专业
      getLawyersBuisness(){
        lawyerLibraryFocus({
          
        }).then((res)=>{
          if(res.code == 200){
            this.professions = res.data
          }
        })
      },
      //获取列表
      getLawyersList(){
        lawyerLibraryList({
          page:this.page,
          pagesize:this.pagesize
        }).then((res) =>{
          if(res.code == 200){
            this.list = res.data.list
          }
        })
      }
    },
    mounted() {
      this.getLawyersList()
      this.getLawyersBuisness()
      this.provinces = prov
      this.cities = []
      this.getLawyersService()
    }

  }

</script>
<style scoped lang="less">
  .lawyers-header {
    position: relative;
    margin-bottom: 10px;
  }

  .lawyers-search {
    position: absolute;
    top: 1vh;
    right: 20px;
  }

  .lawyers-select {
    width: 7vw;
  }

  .lawyers-button {
    width: 70px;
    border-radius: 0;
    margin: 0 5px;
  }

  .lawyers-sorting {
    width: 11vw;
    border: 0;
  }

  .lawyer-form .el-form-item__label {
    float: none;
    font-size: 12px;
    padding-right: 0;
    display: inline-block;
  }

  .lawyer-form .el-form-item {
    margin-bottom: 0;
    display: block;
  }

  .lawyer-form-content {
    font-size: 12px;
  }

  .lawyer-price {
    display: inline-block;
    position: relative;
  }

  .lawyer-price-button {
    position: absolute;
    right: -40px;
    bottom: 7px;
  }

  .dialog-input {
    width: 100px;
  }

  .assessContent {
    margin: 30px 0 50px 0;
    width: 40vw;
  }

</style>

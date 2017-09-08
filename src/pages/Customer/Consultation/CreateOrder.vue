<template>
  <div>
    <div class="detail-header">
      <infor-title title="用户信息">
        <h1 slot="title-content" class="detail-title-left">（核对）</h1>
      </infor-title>
      <infor title="姓名" con="张三" />
      <infor title="性别" con="男" />
      <infor title="手机号" con="18757150144" />
      <infor title="地区" con="无" />
    </div>
    <div class="detail-main">
      <infor-title title="选择订单类型" />
      <el-radio-group v-model="orderType">
        <el-radio-button v-for="(item,index) in orderTypes" :label="index+1" :key="`orderType${index}`" class="item-radio-button">{{item}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="detail-main">
      <infor-title title="选择服务项目" />
      <el-radio-group v-model="serviceType">
        <el-radio-button v-for="(item,index) in services" :label="index+1" :key="`service${index}`" class="item-radio-button">{{item}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="detail-main">
      <infor-title title="填写服务内容" />
      <br/>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="我是：" v-show="serviceType<=2">
          <el-select v-model="form.region" size="small">
            <el-option label="甲方" :value="0"></el-option>
            <el-option label="乙方" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同审查：" v-show="serviceType<=2">
          <el-radio-group v-model="form.resource">
            <el-radio :label="0">纯英语</el-radio>
            <el-radio :label="1">纯中文</el-radio>
            <el-radio :label="2">中英结合</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="涉及金额：" v-show="serviceType<=2">
          <el-input-number v-model="form.price" :controls="false" size="small"></el-input-number>&nbsp元
        </el-form-item>
        <el-form-item label="合同页数：" v-show="serviceType==1">
          <el-input-number v-model="form.page" :controls="false" size="small"></el-input-number>&nbsp页
        </el-form-item>
        <el-form-item label="支付时间：" v-show="serviceType<=5">
          <el-select v-model="form.time" size="small">
            <el-option label="不限制" :value="100"></el-option>
            <el-option :label="`${n}天内`" :value="n" v-for="n in 30" :key="`${n}time`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片：" v-show="serviceType==1">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="企业类型：" v-show="serviceType==6">
          <el-select v-model="form.compony" size="small">
            <el-option :label="item" :value="index" v-for="(item,index) in companys" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求类型：" v-show="serviceType==6">
          <el-radio-group v-model="form.demand">
            <el-radio :label="index" v-for="(item,index) in demands" :key="index">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="我是：" v-show="serviceType==7">
          <el-select v-model="form.region7" size="small">
            <el-option label="原告方" :value="0"></el-option>
            <el-option label="被告方" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件阶段：" v-show="serviceType==7">
          <el-select v-model="form.step" size="small">
            <el-option :label="item" :value="index" v-for="(item,index) in steps" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="我是：" v-show="serviceType==10">
          <el-select v-model="form.region10" size="small">
            <el-option label="受害者" :value="0"></el-option>
            <el-option label="犯罪嫌疑人" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件阶段：" v-show="serviceType==10">
          <el-select v-model="form.step10" size="small">
            <el-option :label="item" :value="index" v-for="(item,index) in step10s" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="address" v-show="serviceType>=6">
          <el-select v-model="form.province" placeholder="选择省份" size="small">
            <el-option v-for="(item,index) in provinces" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="选择城市" size="small">
            <el-option v-for="(item,index) in cities" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="选择地区" size="small">
            <el-option v-for="(item,index) in areas" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询范围" v-show="serviceType==11">
          <el-select v-model="form.profession" placeholder="选择地区" size="small">
            <el-option v-for="(item,index) in professions" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="time" v-show="serviceType==6||serviceType==8||serviceType==9||serviceType==11">
          <el-select v-model="form.time" size="small">
            <el-option label="不限制" :value="100"></el-option>
            <el-option :label="`${n}天内`" :value="n" v-for="n in 30" :key="`${n}time`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="textTitle">
          <inputText v-model="form.desc" :content="textContent" :maxNumber="300"></inputText>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取消创建</el-button>
          <el-button type="primary" @click="onSubmit">创建订单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import InputText from '@/components/InputText.vue'
  export default {
    components: {
      Infor,
      InforTitle,
      InputText
    },
    data() {
      return {
        orderType: 0,
        serviceType: 0,
        orderTypes: ["普通订单", "法务外包"],
        service: 0,
        services: ["合同生成", "合同起草", "发律师函", "代写诉状", "其他文书", "股权设计", "诉讼仲裁", "律师见证", "刑事会见", "刑事辩护", "付费咨询"],
        fileList: [{
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],

        //企业类型
        companys: ["有限公司", "股份有限公司", "普通合伙企业", "有限合伙企业", "国有企业", "其他企业类型"],
        //需求类型
        demands: ["股权激励", "合伙人间股权设计", "融资型股权设计", "股权转让", "代持设计"],
        //省市区
        provinces: ["安徽省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省",
          "浙江省", "浙江省"
        ],
        cities: ["杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市"],
        areas: ["拱塑区", "上城区", "下城区"],

        //案件阶段
        steps: ["一审还未立案", "一审已立案未开庭", "已收到一审判决或裁定", "已收到二审判决或裁定", "其他案件阶段"],
        //刑事辩护里的案件阶段
        step10s: ["公安侦查阶段", "检察院审查起诉阶段", "检察院已起诉未开庭", "已收到一审判决或裁定", "已收到二审判决或裁定", "其他案件阶段"],

        //咨询范围
        professions: ["所有", "医疗纠纷", "金融业务", "保险理财", "劳动人事", "人身损害", "交通事故", "知识产权", "企业事务", "婚姻继承", "房屋财产", "行政案件",
          "建筑工程", "消费维权", "债权债务", "刑事案件", "海事海商", "环境保护", "涉外事务", "财税审计"
        ],

        form: {
          region: 0, //我是
          resource: 0, //合同审查
          price: 0, //涉及金额
          page: 0, //合同页数
          time: "", //支付时间

          compony: 0, //企业类型
          demand: 0, //需求类型
          province: 0, //省份
          city: 0, //城市
          area: 0, //地区

          region7: 0, //诉讼里的我是
          step: 0, //案件阶段

          region10: 0, //刑事辩护里的我是
          step10: 0, //刑事辩护里的案件阶段

          profession: 0, //咨询氛围
          desc: ""
        }
      }
    },
    computed: {
      textTitle() {
        switch (this.serviceType) {
          case 1:
          case 2:
            return "合同描述："
          case 3:
            return "事宜描述："
          case 4:
          case 7:
          case 9:
          case 10:
            return "案件描述："
          case 5:
            return "文书描述："
          case 6:
            return "股权情况："
          case 8:
            return "事项描述："
          case 11:
            return "咨询内容："
          default:
            break;
        }
      },
      textContent() {
        switch (this.serviceType) {
          case 1:
          case 2:
            return "请您阐述合同的作用及其他相关情况，以便律师更好的为您服务。"
          case 3:
            return "请简单描述您需要发律师函的事宜，以便律师更好的为你服务。"
          case 4:
            return "请简单描述您所涉及案件的基本情况。"
          case 5:
            return "请简单描述您所需的文书的名称及大概内容，以便律师更好的为您服务。"
          case 6:
            return "请您阐述您公司现在的股权情况，以及您想做出的调整，以便律师更好的为您服务。"
          case 7:
          case 10:
            return "请简单描述您所涉及案件的基本情况，以及您想达到的目的，以便律师更好的为您服务。"
          case 8:
            return "请简单描述您所需律师见证下的事项，以便律师更好的为您服务。"
          case 9:
            return "请简单描述当事人因何事被羁押，以便律师更好的为您服务。"
          case 11:
            return "请简单描述您所需咨询的内容，以便律师更好的为您服务。"
        }
      },
      address() {
        switch (this.serviceType) {
          case 6:
          case 7:
          case 10:
            return "期望地区："
          case 8:
            return "服务地点："
          case 9:
            return "会见地点："
        }
      },
      time() {
        switch (this.serviceType) {
          case 6:
          case 11:
            return "截止时间："
          case 8:
            return "服务时间："
          case 9:
            return "会见时间："
        }
      }
    },
    methods: {
      onCancel() {
        router.push({
          name: "ConsultationDetail"
        })
      },
      onSubmit() {
        router.push({
          name: "ConsultationDetail"
        })
      }
    }
  }

</script>

<style lang="less">


</style>

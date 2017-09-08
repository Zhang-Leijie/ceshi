<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="cancel">返回</el-button>
      <el-button size="small" @click="save">保存</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="律师信息"></infor-title>
      <el-form :modal="infor" label-width="130px">
        <el-form-item label="手机号：" size="small">
          <el-input v-model="infor.phone" :controls="false" style="width:16vw" type="number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="infor.name" style="width:16vw" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="infor.gender" size="small">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证正面照：">
          <el-upload action="/v1/common/upload" :file-list="fileList1" list-type="picture" :on-success="handleScucess1" :on-remove="handleRemove1">
            <el-button size="small" type="primary" v-if="this.infor.id_card == ''">点击上传</el-button>
            <el-button type="small" :disabled="true" v-else>点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="手持身份证照：">
          <el-upload action="/v1/common/upload" :file-list="fileList2" list-type="picture" :on-success="handleScucess2" :on-remove="handleRemove2">
            <el-button size="small" type="primary" v-if="this.infor.id_card_hand == ''">点击上传</el-button>
            <el-button type="small" :disabled="true" v-else>点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="detail-main">
      <infor-title title="执业信息"></infor-title>
      <el-form :modal="work" label-width="130px">
        <el-form-item label="执业地区：" size="small">

          <!-- <el-select v-model="work.province" placeholder="省" style="width:10vw">
            <el-option v-for="(item,index) in provinces" :key="`province${index}`" :label="item" :value="`province${index}`"></el-option>
          </el-select>
          <el-select v-model="work.city" placeholder="市" style="width:10vw">
            <el-option v-for="(item,index) in cities" :key="`city${index}`" :label="item" :value="`city${index}`"></el-option>
          </el-select>
          <el-select v-model="work.area" placeholder="区" style="width:10vw">
            <el-option v-for="(item,index) in areas" :key="`area${index}`" :label="item" :value="`area${index}`"></el-option>
          </el-select> -->
          <v-distpicker @selected="onSelected" :province="this.work.province" :city="this.work.city" :area="this.work.area" v-if="this.work.area"></v-distpicker>
        </el-form-item>
        <el-form-item label="执业机构：">
          <el-input v-model="work.organization" style="width:16vw" placeholder="请输入您的执业机构"></el-input>
        </el-form-item>
        <el-form-item label="执业证号：" size="small">
          <el-input v-model="work.certificate_number" :controls="false" style="width:16vw" type="number" placeholder="请输入您的执业证号"></el-input>
        </el-form-item>
        <el-form-item label="律师执业资格证：">
          <el-upload action="/v1/common/upload" :file-list="fileList3" list-type="picture" :on-success="handleScucess3" :on-remove="handleRemove3">
            <el-button size="small" type="primary" v-if="this.work.certificate == ''">点击上传</el-button>
            <el-button type="small" :disabled="true" v-else>点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="detail-main">
      <infor-title title="擅长专业">
        <h1 slot="title-content" class="detail-title-left">（最多选择三项）</h1>
      </infor-title>
      <infor-title></infor-title>
      <div style="paddingLeft:7vw">
        <el-checkbox-group v-model="profession" :max="3">
          <el-checkbox-button v-for="(item,index) in professions" :key="`profession${index}`" :label="item.id">{{item.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="detail-main">
        <infor-title title="擅长服务">
          <h1 slot="title-content" class="detail-title-left">（可多选）</h1>
        </infor-title>
        <div style="paddingLeft:7vw">
          <el-checkbox-group v-model="service">
            <el-checkbox-button v-for="(item,index) in services" :key="`service${index}`" :label="item.id">{{item.name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import { businessList , servicesList , addLawyer , getLawyer , modifyLawyer} from '@/ajax/post.js'

  export default {
    components: {
      InforTitle
    },
    data() {
      return {
        data:'',
        infor: { //律师信息
          phone: "",
          name: "",
          gender: 1,
          avatar:"",
          id_card:"",
          id_card_hand:"",
        },

        work: { //执业信息
          province: "",
          city: "",
          area: "",
          district_id:"",
          certificate_number: "",
          organization:"",
          certificate:"",
        },

        profession: [], //选择专业
        isThree: false, //判断是否3个
        service: [], //选择服务


        fileList1: [],
        fileList2: [],
        fileList3: [],

        cities: ["杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市", "杭州市"],
        provinces: ["安徽省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省", "浙江省",
          "浙江省", "浙江省"
        ],
        areas: ["拱墅区", "上城区", "下城区", "滨江区"],
        professions: [],
        services: [],
      }
    },
    methods: {
      handleScucess1(res, file){
        this.infor.id_card = res.data;
      },
      handleRemove1(file, fileList) {
        this.infor.id_card = "";
      },
      handleScucess2(res, file){
        this.infor.id_card_hand = res.data;
      },
      handleRemove2(file, fileList) {
        this.infor.id_card_hand = "";
      },
      handleScucess3(res, file){
        this.work.certificate = res.data;
      },
      handleRemove3(file, fileList) {
        this.work.certificate = "";
      },
      //返回
      cancel() {
        router.push({
          name: "LawyerList"
        })
      },

      //保存
      save() {
        if (this.infor.phone == "" || this.infor.name == "" || this.infor.gender == "" || this.infor.id_card == "" || this.infor.id_card_hand == "" || this.work.province == "" || this.work.city =="" || this.work.area == "" || this.work.district_id == "" || this.work.certificate == "" || this.work.certificate_number == "" || this.work.organization == "") {
          this.$message({
            message: "请输入完整的信息",
            type: 'warning'
          }) 
        } else {
            modifyLawyer(this.$route.query.id,{
              phone: this.infor.phone-0,
              name: this.infor.name,
              gender: this.infor.gender-0,
              avatar: this.infor.id_card,
              id_card: this.infor.id_card,
              id_card_hand : this.infor.id_card_hand,
              certificate: this.work.certificate,
              certificate_number: this.work.certificate_number,
              address: this.work.address,
              organization: this.work.organization,
              district_id: this.work.district_id.toString(),
              services: this.service.join(','),
              business: this.profession.join(','),
            }).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: 'success'
                }) 
                router.push({
                  // name: "LawyerList"
                })
              };
            })
        }
      },

      onSelected(data){
        console.log(data)
        this.work.area = data.area.value;
        this.work.province = data.province.value;
        this.work.city = data.city.value;
        this.work.district_id = data.area.code;
        this.work.address = data.province.value + data.city.value + data.area.value;
      },

    },
    mounted:function() {
      businessList({}).then((res) => {
        if (res.code == 200) {
          this.professions =  res.data
        };
      })
      servicesList({}).then((res) => {
        if (res.code == 200) {
          this.services =  res.data
        };
      })
      getLawyer(this.$route.query.id,{}).then((res) => {
        if (res.code == 200) {
          this.data = res.data;
          this.infor = { //律师信息
            phone: res.data.phone,
            name: res.data.name,
            gender: res.data.gender,
            avatar: res.data.avatar,
            id_card: res.data.id_card,
            id_card_hand: res.data.id_card_hand,
          };
          this.fileList1 = [
            {
              name: '身份证正面照', 
              url: 'https://api.fa-zai.com/upload/'+res.data.id_card
            }
          ];
          this.fileList2 = [
            {
              name: '手持身份证照', 
              url: 'https://api.fa-zai.com/upload/'+res.data.id_card_hand
            }
          ];
          this.work = { //执业信息
            province: (this.data.district_id.toString().substring(0,2)+'0000')-0,
            city: (this.data.district_id.toString().substring(0,4)+'00')-0,
            area: this.data.district_id,
            address:this.data.address,
            district_id:this.data.district_id,
            certificate_number: this.data.certificate_number,
            organization:this.data.organization,
            certificate:this.data.certificate,
          };
          this.fileList3 = [
            {
              name: '律师执业资格证', 
              url: 'https://api.fa-zai.com/upload/'+res.data.certificate
            }
          ];
          var self = this;
          var x = res.data.business.split(',');
          x.forEach(function(list){
            list = list-0;
            self.profession.push(list);
          })

          var y = res.data.services.split(',');
          y.forEach(function(list){
            list = list-0;
            self.service.push(list);
          })
        }
      })
    }
  }

</script>
<style>


</style>

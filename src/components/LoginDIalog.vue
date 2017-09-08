<template>
  <div class="loginDialog-bg">
    <el-select v-model="selected" v-if="type<2" class="loginDialog-select" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <h1 class="loginDialog-header" v-if="type>=2">{{header}}</h1>
    <div class="loginDialog-main">
      <div class="loginDialog-phone">
        <div class="loginDialog-icon">
          <span class="icon-phone"></span>
        </div>
        <input placeholder="手机号" v-model="account" type="number" />
      </div>
      <div class="loginDialog-password">
        <div class="loginDialog-icon">
          <span class="icon-password"></span>
        </div>
        <input placeholder="密码" v-model="password" type="password" />
      </div>
    </div>
    <a class="loginDialog-button" @click="login">登录</a>
    <h1 class="loginDialog-message" v-show="messageShow">{{message}}</h1>
  </div>
</template>
<script>
  import {
    login
  } from '@/ajax/post.js'

  export default {
    props: ['type'],
    data() {
      return {
        account: "", //账号
        password: "", //密码
        messageShow: false, //是否展示提示信息
        message: "该账号已被锁定，无法登录", //错误提示信息
        header: "",
        options: [{
          label: "普通客服登录",
          value: 1
        }, {
          label: "客服主管登录",
          value: 2
        }],
        selected: 0
      }
    },
    methods: {
      login() {
        let {
          name,
          id
        } = this.getRouter()
        this.messageShow = false
        const {
          account,
          password
        } = this
        switch (true) {
          case !account:
            this.changeMessage("请输入账号")
            break;
          case account && !password:
            this.changeMessage("请输入密码")
          default:
            // setTimeout(() => {
            //   this.$store.dispatch("getMyInfo")
            //   router.push({
            //     name: name
            //   })
            // }, 1000);
            if (this.type == 0) {
              this.type = this.selected;
            };
            login({
              phone: this.account,
              password: this.password,
              type: this.type,
            }).then((res) => {
              if (res.code == 200) {

                if (this.type == 1) {
                  //普通客服
                  localStorage.setItem('tokenPTKF', res.data.token);
                } else if (this.type == 2) {
                  //客服主管
                  localStorage.setItem('tokenKFZG', res.data.token);
                } else if (this.type == 3) {
                  //财务
                  localStorage.setItem('tokenCW', res.data.token);
                } else if (this.type == 4) {
                  //运营
                  localStorage.setItem('tokenYY', res.data.token);
                } else if (this.type == 5) {
                  //管理员
                  localStorage.setItem('tokenGLY', res.data.token);
                } 
                
                localStorage.setItem('token', res.data.token);

                localStorage.setItem('name', res.data.name);
                localStorage.setItem('userId', res.data.id);

                router.push({
                  name: name,
                  // params: {
                  //   typeId: id
                  // }
                  query: {
                    typeId: id
                  }
                })
              } else {
                this.changeMessage(res.msg)
              }
            })
            break;
        }
      },
      changeMessage(message) {
        this.message = message
        this.messageShow = true
      },
      getRouter() {
        let name = "",
          id = 0
        switch (this.type) {
          case 5:
            return {
              name: "Admin",
              id: 5
            }
          case 3:
            return {
              name: "Finance",
              id: 3
            }
          case 4:
            return {
              name: "Operation",
              id: 4
            }
        }
        name = this.selected == 1 ? 'Customer' : 'Supervisor'
        id = this.selected
        return {
          name,
          id
        }
      }
    },
    mounted() {
      switch (this.type) {
        case 0:
          this.selected = 1
          break;
        case 1:
          this.selected = 2
          break;
        case 5:
          this.header = "管理员登录"
          break;
        case 3:
          this.header = "财务登录"
          break;
        case 4:
          this.header = "运营登录"
          break;
      }
    }
  }

</script>
<style lang="less">
  .loginDialog-bg {
    position: absolute;
    right: 15vw;
    width: 20vw;
    top: 10vh;
    height: 40vh;
    background: #ffffff;
    text-align: center;

    .loginDialog-header,
    .loginDialog-select {
      border: none;
      height: 26px;
      margin-top: 5vh;
      font-size: 16px;
      border: none;
      input[type="text"] {
        border: none;
        text-align: center;
      }
      .el-input__inner {
        font-size: 16px;
      }
    }


    .loginDialog-main {
      width: 18vw;
      height: 18vh;
      margin-left: 1vw;
    }
    .loginDialog-phone,
    .loginDialog-password {
      float: left;
      font-size: 14px;
      input {
        width: 15.5vw;
        height: 5vh;
        text-indent: 10px;
        border: 1px solid #dddddd;
      }
    }

    .loginDialog-phone {
      margin-top: 2vh;
    }

    .loginDialog-password {
      margin-top: 3vh;
      margin-bottom: 3vh;
    }

    .loginDialog-icon {
      float: left;
      width: 2.5vw;
      height: 5vh;
      background: #dddddd;
      padding: 4px;
      span {
        display: inline-block;
        width: 1.5vw;
        height: 3.5vh;
      }
      .icon-phone {
        background: url('../assets/image/phone.png');
        background-size: 100% 100%;
      }
      .icon-password {
        background: url('../assets/image/password.png');
        background-size: 100% 100%;
      }
    }

    .loginDialog-button {
      display: inline-block;
      width: 18vw;
      height: 5vh;
      background: #42bd56;
      line-height: 5vh;
      font-size: 14px;
      font-family: "微软雅黑";
      letter-spacing: 4px;
      color: #FFFFFF;
    }

    .loginDialog-message {
      margin-top: 2vh;
      font-size: 12px;
      color: #e62222;
    }
  }

</style>

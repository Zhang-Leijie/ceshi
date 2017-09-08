<template>
  <div class="header-bg">
    <div class="header-logo">
      <span class="header-logo-left">法在</span>
      <span class="header-logo-right">您身边的法律专家</span>
    </div>
    <div class="header-login">
      <span v-if="!loginIn">请登录</span>
      <template v-if="loginIn">
        <span>{{ loginIn }}</span>
        <a @click="loginOut" class="header-loginOut-button">退出</a>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      loginIn() {
        return localStorage.getItem('name')
      }
    },
    props: ["type"],

    methods: {
      loginOut() {
        let name = ""
        console.log(this.type)
        switch (this.type) {
          case 0:
            name = ""
            break;
          case 1:
            name = "Login"
            break;
          case 2:
            name = "Login"
            break;
          case 3:
            name = "FinanceLogin"
            break;
          case 4:
            name = "OperationLogin"
            break;
          case 5:
            name = "AdminLogin"
            break;
        }
        console.log(name)
        localStorage.setItem('name', "");
        this.$store.dispatch('loginOut')
        router.push({
          name: name,
        })
      }
    }
  }

</script>
<style lang="less">
  .header-bg {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #FFFFFF;
  }

  .header-logo {
    float: left;
    margin-left: 15vw;
    font-size: 20px;
    .header-logo-left {
      font-size: 25px;
      font-weight: bold;
      font-family: "微软雅黑";
      margin-right: 15px;
      &::before {
        content: "";
        display: inline-block;
        background: url('../assets/image/logo.png');
        background-size: 100% 100%;
        height: 36px;
        width: 36px;
        margin-right: 10px;
        position: relative;
        top: 7px;
      }
    }
    .header-logo-right {
      border-left: 2px solid #666;
      padding-left: 20px;
    }
  }

  .header-login {
    float: right;
    margin-right: 15vw;
    font-size: 14px;
    line-height: 60px;
    span {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        background: url('../assets/image/header.png');
        height: 36px;
        width: 36px;
        left: -50px;
        top: -13px;
        background-size: 100% 100%;
      }
    }
    .header-loginOut-button {
      width: 50px;
      display: inline-block;
      border: 1px solid #42bd56;
      color: #42bd56;
      line-height: 25px;
      text-align: center;
    }
  }

</style>

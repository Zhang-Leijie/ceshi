<template>
  <div class="login-bg">
    <v-header></v-header>
    <div class="login-main" :style="`height:${getHeight}px`">
      <login-dialog :type="5"></login-dialog>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import LoginDialog from '../components/LoginDIalog'
  export default {
    components: {
      LoginDialog
    },
    computed: {
      getHeight() {
        return window.innerHeight - 60
      }
    }
  }

</script>
<style lang="less">


</style>

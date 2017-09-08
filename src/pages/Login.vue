<template>
  <div class="login-bg">
    <v-header/>
    <div class="login-main" :style="`height:${getHeight}px`">
      <login-dialog :type="0"></login-dialog>
    </div>
    <v-footer/>
  </div>
</template>

<script>
  import LoginDialog from '../components/LoginDIalog.vue'
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

<template>
  <div class="main-bg">
    <v-header :type="typeId" />
    <div :style="`min-height:${getHeight}px`" class="list-bg">
      <router-view/>
    </div>
    <v-footer/>
  </div>
</template>

<script>
  export default {
    computed: {
      getHeight() {
        return window.innerHeight * 0.89 - 60
      }
    },
    data() {
      return {
        typeId: 0
      }
    },
    mounted() {
      this.typeId = parseInt(this.$route.query.typeId)
    }
  }

</script>
<style lang="less">
  .main-bg {
    background: #eeeeee;
    padding-bottom: 9vh;
    position: relative;
    min-width: 1200px;
  }

  .list-bg {
    //列表菜单样式
    margin: 2vh 15vw 0;
    background: #FFFFFF;
    position: relative;
    &::after {
      display: block;
      clear: both;
      content: "";
      visibility: hidden;
      height: 0
    }
  }

</style>

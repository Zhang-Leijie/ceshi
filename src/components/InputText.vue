<template>
  <div>
    <el-input type="textarea" :rows="5" :placeholder="content" :maxlength="maxNumber" v-model="text" v-on:input="updateValue($event)"></el-input>
    <h1 class="inputText-title">您还可以输入{{num}}字</h1>
  </div>
</template>
<script>
  export default {
    props: ["maxNumber", "content", "value","answer"],
    data() {
      return {
        text: "",
        num: 0
      }
    },
    methods: {
      updateValue(val) {
        let length = val.length
        this.num = this.maxNumber - length
        this.$emit('input', val)
      }
    },
    mounted() {
      this.text = this.answer;
      this.num = this.maxNumber;
    }
  }

</script>
<style lang="less">
  .inputText-title {
    font-size: 16px;
    color: #999;
    margin-top: 10px;
    text-align: right;
  }

</style>

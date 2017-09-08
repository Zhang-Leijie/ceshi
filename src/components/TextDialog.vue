<template>
  <div>
    <el-dialog :visible.sync="open" :show-close="false" :close-on-click-modal="false">
      <h1 slot="title" class="dialog-title">{{title}}</h1>
      <inputText :maxNumber="500" :content="content" v-model="inputText">
      </inputText>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取消{{type}}</el-button>
        <el-button type="primary" @click="onSubmit">确认{{type}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InputText from './InputText.vue'
  export default {
    props: ["title", "content", "type", "open"],
    components: {
      InputText
    },
    data() {
      return {
        inputText: "",
      }
    },
    methods: {
      onCancel() {
        this.$emit('update:open', false)
      },
      onSubmit() {
        this.$emit('submit', this.inputText)
        
      }
    }
  }

</script>
<style>


</style>

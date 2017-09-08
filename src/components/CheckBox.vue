<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedBoxs" @change="checkedCitiesChange">
      <el-checkbox v-for="(item,index) in list" :label="item" :key="`list${index}`">{{item}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkAll: true,
        checkedBoxs: [],
        isIndeterminate: true
      }
    },
    props: ["list", "value"],
    methods: {
      checkAllChange(event) {
        this.checkedBoxs = event.target.checked ? this.list : []
        this.isIndeterminate = false
        this.$emit("input", this.checkedBoxs)
      },
      checkedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.list.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
        this.$emit("input", this.checkedBoxs)
      }
    }
  }

</script>
<style lang="less">


</style>

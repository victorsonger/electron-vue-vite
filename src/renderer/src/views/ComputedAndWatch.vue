<script setup lang="ts">

import {ref, watchEffect, computed} from 'vue';

import { ElForm, ElFormItem, ElInput } from 'element-plus';

const form1 = ref({
  name: '张三',
  age: '11'
})
const form2 = ref({
  name: '李四',
  age: '20'
})

const allForm = computed(() => {
  return {
    form1: form1.value,
    form2: form2.value,
  }
})




watchEffect(() => {
  console.log('重新渲染');
  console.log('allForm', allForm.value.form1.name)
})



</script>

<template>
<div id="computed-and-watch">
  <ElForm>
    <ElFormItem label="姓名1">
      <ElInput v-model="form1.name"></ElInput>
    </ElFormItem>
    <ElFormItem label="年龄1">
      <ElInput v-model="form1.age"></ElInput>
    </ElFormItem>
  </ElForm>

    <ElForm>
    <ElFormItem label="姓名2">
      <ElInput v-model="form2.name"></ElInput>
    </ElFormItem>
    <ElFormItem label="年龄2">
      <ElInput v-model="form2.age"></ElInput>
    </ElFormItem>
  </ElForm>

</div>
</template>



<style lang="less" scoped>
</style>
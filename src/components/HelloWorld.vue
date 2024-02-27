<template>
  <div>
    <h1>{{ money }}</h1>
    <el-button type="primary" @click="handler">
      点我加一
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let money = ref(100)
const handler = () => {
  money.value++;
}
</script>

<style lang="scss" scoped></style>

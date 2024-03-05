<template>
  <div>
    <h1>{{ money }}</h1>
    <el-button type="primary" @click="handler"> 点我加一 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
let money = ref(100);
let array = ref([1, 2, 3, 4, 5, 6]);
const total = computed(() =>
  array.value.reduce((prev: number, next: number) => prev + next, 0),
);
const handler = () => {
  money.value = money.value + total.value;
};
</script>

<style lang="scss" scoped></style>

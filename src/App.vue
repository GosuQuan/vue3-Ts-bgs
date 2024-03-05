<template>
  <el-button> hi </el-button>
  <h1>测axios二次</h1>
  <HelloWorld></HelloWorld>
  <div>
    <svg>
      <use xlink:href="#icon-arrow"></use>
    </svg>
  </div>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import request from "@/utils/request";
import { onMounted } from "vue";

onMounted(() => {
  request({
    url: "/user/login",
    method: "post",
    data: {
      username: "admin",
      password: "11111",
    },
  }).then((res) => {
    console.log(res);
  });
});
</script>

<style lang="scss" scoped></style>

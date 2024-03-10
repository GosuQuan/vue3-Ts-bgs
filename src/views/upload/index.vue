<template>
  <div>
    <h1>大文件分片上传</h1>
    <!-- <el-upload drag multiple :auto-upload="true" :http-request="checkedFile" :before-remove="removeFile" :limit="10"
            action="/tools/upload_test/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload> -->
    <el-button type="primary" @click="handleClick">点击发请求</el-button>
    <!-- <el-progress type="circle" :percentage="progress" class="progress" v-if="showProgress"></el-progress> -->
  </div>
</template>

<script setup lang="ts">
import { upload_merge } from "@/api/upload";
import axios from "axios";
import SparkMD5 from "spark-md5";
import { onMounted, ref } from "vue";

const upload = () => {
  upload_merge();
};
const handleClick = () => {
  upload();
};
</script>

<style scoped></style>

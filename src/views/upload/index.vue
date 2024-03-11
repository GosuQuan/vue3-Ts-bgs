<template>
    <div>
        <h1>大文件分片上传</h1>
        <el-upload class="upload-demo" :on-change="handleClick" drag :http-request="upload" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
import { upload_singleFile } from "@/api/upload";
import { ref } from "vue";
const file = ref<File>();
const fileList = ref<File[]>([]);
const handleClick = (newFile: File, newFileList: File[]) => {
    file.value = newFile.raw;
    fileList.value = newFileList;
};
const upload = () => {
    if (!file) {
        alert("请先选择上传文件");
        return;

    }
    let formData = new FormData();
    formData.append("file", file.value);
    // console.log(file.value)
    formData.append("filename", file.value.name)
    // console.log(formData)
    upload_singleFile(formData).then(
        res => {
            if (+res.code === 0) {
                alert("file upload success")
            }
        }
    ).catch(err => {
    })


}

</script>


<style scoped></style>
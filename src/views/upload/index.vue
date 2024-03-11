<template>
    <div>
        <h1>大文件分片上传</h1>
        <el-upload class="upload-demo" :on-change="handleClick" drag :http-request="upload" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
            </div>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
import { upload_singleFile, upload_already } from "@/api/upload";
import { ref } from "vue";
import SparkMD5 from "spark-md5";
const file = ref<File>();
const fileList = ref<File[]>([]);
const already = ref([])
const handleClick = (newFile: File, newFileList: File[]) => {
    file.value = newFile.raw;
    fileList.value = newFileList;
};
const upload_singleFile = async () => {
    if (!file) {
        alert("请先选择上传文件");
        return;
    }

    const { HASH, filename } = await changeBuffer(file.value);
    console.log(HASH);
    let formData = new FormData();
    formData.append("file", file.value);
    // console.log(file.value)
    formData.append("filename", file.value.name);
    // console.log(formData)
    upload_singleFile(formData)
        .then((res) => {
            if (+res.code === 0) {
                alert("file upload success");
            }
        })
        .catch((err) => { });
};

//upload the file then return the hash of each files
const changeBuffer = (file) => {
    return new Promise((rs) => {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            let buffer = e.target?.result,
                spark = new SparkMD5.ArrayBuffer(),
                HASH,
                suffix;
            spark.append(buffer);
            HASH = spark.end();
            //以...后缀结尾
            suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
            rs({
                buffer,
                HASH,
                suffix,
                filename: `${HASH}.${suffix}`,
            });
        };
    });
};
const complete = () => {
    //handle opertation to complete
    // the progress bar

    //merge the chunk and return data.


}

const uploadBigFile = async (file) => {
    //get Hash
    const { HASH, suffix } = await changeBuffer(file);
    //get already piece
    try {
        const data = upload_already(HASH);
        if (+data.code === 0) {
            already.value = data.FileList;
        }
    } catch (error) {

    }
    //文件切片处理
    //100MB
    let max = 100 * 1024 * 1024,
        count = Math.ceil(file.size / max),
        index = 0,
        chunks = [];
    if (count > 100) {
        max = file.size / 100;
        count = 100;



    }
    while (index < count) {
        chunks.push({
            file: file.slice(index * max, (index + 1) * max),
            filename: `${HASH}_${index + 1}.${suffix}`
        })
        index++;
    }

    //upload chunk
    chunks.map(chunk => {
        let fm = new FormData();
        fm.append('file', chunk.file);
        fm.append('filename', chunk.filename);
        upload_already(fm).then(data => {
            if (+data.code === 0) {
                complete();
            }

        }).catch(
            err => {
                console.log(err)
            }
        )
    })
    //merge chunk


}
</script>

<style scoped></style>

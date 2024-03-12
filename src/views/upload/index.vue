<template>
  <div>
    <h1>大文件分片上传</h1>
    <el-upload class="upload-demo" :on-change="handleClick" drag :http-request="uploadBigFile" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { upload_singleFile, upload_already, upload_chunk, upload_merge } from "@/api/upload";
import { ref } from "vue";
import SparkMD5 from "spark-md5";
const file = ref<File>();
const fileList = ref<File[]>([]);
const already = ref([]);
const handleClick = (newFile: File) => {
  file.value = newFile.raw;

  // fileList.value = newFileList;
};
const upload = async () => {
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


const uploadBigFile = async () => {
  //get Hash
  const { HASH, suffix } = await changeBuffer(file.value);
  console.log(HASH);
  //get already piece
  try {
    const data = await upload_already();
    if (+data.code === 0) {
      console.log(data.FileList);
      already.value = data.FileList;
    }
  } catch (error) {
    
  }
  //文件切片处理
  //100KB

  let max = 1 * 1024,
    count = Math.ceil(file.value.size / max),
    index = 0,
    chunks = [];
  console.log(file.value.size)
  if (count > 100) {
    max = file.value.size / 100;
    count = 100;
  }
  while (index < count) {
    chunks.push({
      file: file.value.slice(index * max, (index + 1) * max),
      filename: `${HASH}_${index + 1}.${suffix}`,
    });

    index++;
  }
  const complete = async () => {
    //handle opertation to complete
    // the progress bar
    //merge the chunk and return data.
    index++;
    if (index < count) return;
    // progress bar to 100%

    try {
      console.log(HASH)
      const data = await upload_merge({ HASH: HASH, count })
      if (+data.code === 0)
        alert("恭喜，上传成功")
      return;
    } catch (err) {
      console.log("切片合并失败！");
    }

  };

  //upload chunk
  chunks.map((chunk) => {
    if (already.value.length > 0 && already.value.includes(chunk.filename)) {
      complete();
      return;
    }
    let fm = new FormData();
    fm.append("file", chunk.file);
    fm.append("filename", chunk.filename);
    upload_chunk(fm)
      .then((data) => {
        if (+data.code === 0) {
          complete();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //merge chunk
};
</script>

<style scoped></style>

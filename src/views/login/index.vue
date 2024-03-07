<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>Welcome</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              type="text"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              @click="login"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/module/user";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
let loginForm = reactive({ username: "admin", password: "111111" });
let useStore = useUserStore();
let $router = useRouter();
let loading = ref(false);
const login = async () => {
  loading.value = true;
  //use Store to ajax
  try {
    await useStore.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      type: "success",
      message: "登录成功",
    });
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: white;

  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  // background:
  background-size: cover;
}

.login_btn {
  width: 100%;
}

.h1 {
}

.h2 {
}
</style>

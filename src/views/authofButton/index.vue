<template>
    <div class="container">

        <el-select class="selector" v-model="selectedValue" placeholder="请选择" @change="handlechange">
            <el-option v-for="item in arr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <div class="button-set">

            <Authentication>
                <template #default="{ userPermissions }">
                    <el-button :disabled="!userPermissions.includes('sys:add')" type="primary">添加</el-button>
                </template>
            </Authentication>
            <Authentication permission="sys:delete">
                <el-button type="danger">删除</el-button>
            </Authentication>
            <Authentication permission="sys:update">
                <el-button>修改</el-button>
            </Authentication>
            <Authentication permission="sys:edit">
                <el-button>编辑</el-button>
            </Authentication>




        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Authentication from '@/views/authofButton/auth/index.vue';
import userAuthStore from '@/store/module/userauth';
let arr = ref([]);
let selectedValue = ref('')
const UserAuth = userAuthStore();
arr.value = [{ label: "超管", value: "ssp" }, { label: "普通管理员", value: "sp" }, { label: "用户", value: "user" }];
const handlechange = (newValue) => {
    selectedValue.value = newValue;
    UserAuth.$state.user = selectedValue.value;

}

</script>

<style scoped>
.container {
    flex-direction: column;
    height: 400px;
    display: flex;
    justify-content: center;
    /* 使子元素在主轴（横轴）上居中 */
    align-items: center;
    /* 使子元素在交叉轴（纵轴）上居中 */
}

.selector {
    padding: 20px;
    width: 200px;

}

.button-set {
    /* justify-content: center; */
    /* text-align: center;
    align-items: center; */
}
</style>
<template>
    <slot v-if="showSlot" :userPermissions="permissions"></slot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import userAuthStore from '@/store/module/userauth';
const props = defineProps({
    permission: {
        type: [String, Array]
    },
});
let permissions = ref([]);
const showSlot = computed(() => {
    permissions.value = userAuthStore().getauth;
    
    if (!permissions.value) {
        return false; // 或者根据您的需求返回一个默认值，如：return props.permission ? false : true;
    }
    if (!props.permission) {
        return true;
    }
    if (!permissions?.value.includes(props.permission)) {
        console.log(permissions.value);
        return false;
    }
    
    else return true;


})

</script>

<style scoped></style>
<template>
    <div ref="listContainer" class="virtual-list">
        <div v-for="index in 200" :key="index">
            Item {{ index }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
    visibleItem: 2000,
})

</script>

<style scoped></style>
<template>
  <div class="wrapper" ref="wrapper" @scroll="wrapperScroll($event)">
    <div
      class="wrapper-scroll"
      :style="{ height: containerHeight + 'px' }"
      style="position: relative"
    >
      <div
        :style="{ transform: `translateY(${scrollTopWrapper}px)` }"
        style="position: absolute; width: 100%"
      >
        <div
          v-for="(item, key) in showItem"
          :key="key"
          style="height: 40px; line-height: 40px"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from "vue";

//当前状态的索引
let startKey = ref(0);
//视窗内应该显示的 DOM 数量
let showItemNum = ref(0);
//容器dom节点
const wrapper = ref(null);
//容器高度
let wrapperHeight = ref(0);

const count = ref(100000);
let arr = ref([]);
for (let index = 0; index < count.value; index++) {
  arr.value.push(index);
}
//容器真实高度
let containerHeight = ref(arr.value.length * 40);
nextTick(() => {
  wrapperHeight.value = wrapper.value.clientHeight;
  console.log(wrapper.value.clientHeight);
  showItemNum.value = Math.ceil(wrapperHeight.value / 40);
});

let scrollTopWrapper = ref(0);
const wrapperScroll = (e) => {
  //计算当前状态的索引
  let tempNum = Math.floor(e.target.scrollTop / 40);
  //当前状态的索引发生变化才触发视图层刷新
  if (tempNum !== startKey.value) {
    startKey.value = tempNum;
    scrollTopWrapper.value = e.target.scrollTop;
  }
};
//预先加载数据，提升用户体验
const showItem = computed(() => {
  return [
    ...arr.value.slice(startKey.value, showItemNum.value + startKey.value + 6),
  ];
});
</script>

<style>
.wrapper {
  position: relative;
  width: 200px;
  height: 400px;
  overflow: auto;
  border: 1px solid #ccc;
}
</style>

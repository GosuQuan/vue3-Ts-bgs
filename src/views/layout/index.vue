<template>
  <div class="layout_container">
    <div class="layout_slider">123</div>
    <div class="layout_tabbar">213</div>
    <div class="layout_main">
      <p style="height: 100000px; background-color: green"></p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    background-color: aqua;
    top: 0px;
    left: $base-menu-width;
    height: $base-tabbar-height;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellowgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>

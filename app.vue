<template>
  <div class="container">
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import './assets/var.less';
import './assets/default.less';
</script>
<style lang="less" scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

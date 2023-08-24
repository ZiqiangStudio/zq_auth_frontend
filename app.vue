<template>
  <div class="container">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>
<script setup lang="ts">
import './assets/var.less';
import './assets/default.less';
import 'vue-m-message/dist/style.css';
</script>
<style lang="less" scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg);
}

:deep(*) {
  color: var(--color-text);
}
</style>

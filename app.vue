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
</script>
<style lang="less" scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg);
}

:deep(*) {
  color: var(--color-text);
}
</style>

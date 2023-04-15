<template>
  <div class="container">
    <div class="logo">
      <img src="/icon/zq_logo.svg" alt="自强Studio Logo" />
    </div>
    <div class="connect">
      <img src="/icon/connect.svg" alt="子应用Logo" />
    </div>
    <div class="logo">
      <img :src="appLogo" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  appLogo: {
    type: String,
    required: true,
  },
});
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius-l);
  box-shadow: var(--box-shadow-l);
  display: flex;
  align-items: center;
  justify-content: center;


  img {
    max-width: 80px;
    max-height: 80px;
  }
}
</style>

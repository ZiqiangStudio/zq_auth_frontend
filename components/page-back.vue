<template>
  <button class="back" @click="back"><img src="/icon/back.svg" /></button>
</template>
<script lang="ts" setup>
const router = useRouter();
function back() {
  router.back();
}
</script>
<style lang="less" scoped>
.back {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }
}
</style>

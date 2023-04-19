<template>
  <button class="back" @click="back"><Back class="icon" /></button>
</template>
<script lang="ts" setup>
import Back from 'assets/icon/back.svg?component';

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

  .icon {
    width: 20px;
    height: 20px;
    fill: var(--color-text);
  }
}
</style>

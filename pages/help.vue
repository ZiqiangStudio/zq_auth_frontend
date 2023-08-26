<template>
  <page-back v-if="!isWxapp" />
  <page-header
    title="如何访问武大邮箱？"
    :notice="`在浏览器中打开 ${WHU_MAIL} 以访问武大邮箱。新生邮箱初始用户名为学号，密码为身份证后六位+考生号后两位`"
  />
  <p v-if="!isWxapp" class="action" @click="handleOpen"><a>访问武大邮箱</a></p>
</template>
<script setup lang="ts">
import { useWxapp } from '@/utils/use-wxapp';
import { WHU_MAIL } from '@/constants/url';
import MMessage from 'vue-m-message';

const isWxapp = useWxapp();

function handleOpen() {
  try {
    window.open(WHU_MAIL);
  } catch {
    MMessage.error('访问失败，请手动打开武大邮箱');
  }
}
</script>
<style scoped lang="less">
.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
}
</style>

<template>
  <page-back v-if="!isWxapp" />
  <div class="container">
    <img :src="image" />
    <h1>常见问题</h1>
    <h2>如何访问武大邮箱？</h2>
    <p>在浏览器中打开 {{ WHU_MAIL }} 以访问武大邮箱。新生邮箱初始用户名为学号，密码为身份证后六位+考生号后两位。</p>
    <p v-if="!isWxapp" class="action" @click="handleOpen"><a>访问武大邮箱</a></p>
    <h2>无法访问武大邮箱？</h2>
    <p>
      如果遇到邮箱无法登录的问题，请确认已经激活武大邮箱。如果依然存在问题，可以联系信息中心寻求进一步的帮助，或者联系自强
      Studio 技术中心人工认证。
    </p>
  </div>
</template>
<script setup lang="ts">
import { useWxapp } from '@/utils/use-wxapp';
import { WHU_MAIL } from '@/constants/url';
import MMessage from 'vue-m-message';

const isWxapp = useWxapp();

const image = isDark ? '/image/help-dark.svg' : '/image/help.svg';

function handleOpen() {
  try {
    window.open(WHU_MAIL);
  } catch {
    MMessage.error('访问失败，请手动打开武大邮箱');
  }
}
</script>
<style scoped lang="less">
.container {
  max-width: 500px;
}

img {
  width: 250px;
  display: block;
  margin: 0 auto 28px;
}

h1 {
  margin-bottom: 16px;
  text-align: center;
}

h2 {
  margin: 12px 0 4px;

  &:first-of-type {
    margin-top: 0;
  }
}

p:not(.action) {
  font-size: 15px;
  color: var(--color-secondary);
}

.action {
  font-size: 14px;
  margin-top: 4px;
  cursor: pointer;
}
</style>

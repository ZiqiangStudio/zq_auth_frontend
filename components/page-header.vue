<template>
  <header>
    <app-header v-if="appLogo" :app-logo="appLogo" />
    <img v-if="image" :src="image" />
    <h1 v-if="title" :style="{ marginTop: titleGap }">{{ title }}</h1>
    <h1 v-else :style="{ marginTop: titleGap }">使用<strong>自强 Studio 账号</strong>登录</h1>
    <p class="notice">{{ notice }}</p>
  </header>
</template>
<script lang="ts" setup>
defineProps({
  appLogo: {
    type: String,
    required: false,
    default: '',
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  notice: {
    type: String,
    default: '使用同一个账号来登录所有的自强产品，从此无需重复输入个人信息',
  },
  titleGap: {
    type: String,
    default: '40px',
  },
});
</script>
<style lang="less" scoped>
header {
  text-align: center;

  h1 {
    font-size: 28px;
    margin-bottom: 6px;
  }

  .notice {
    padding: 0 20px;
    font-size: 15px;
    line-height: 21px;
    color: var(--color-secondary);
  }
}
</style>

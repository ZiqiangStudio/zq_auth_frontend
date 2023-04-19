<template>
  <page-header :image="image" title="学生身份认证成功" notice="你可以回到应用中继续注册流程" title-gap="15px" />
</template>
<script lang="ts" setup>
const image = isDark ? '/image/certify-success-dark.svg' : '/image/certify-success.svg';
</script>

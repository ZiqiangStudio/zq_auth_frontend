<template>
  <div class="container">
    <slot />
  </div>
</template>
<style scoped lang="less">
.container {
  padding: 0 40px;
  box-sizing: border-box;
}

:deep(input) {
  display: block;
  border: none;
  border-radius: var(--border-radius-m);
  font-size: 15px;
  line-height: 21px;
  background-color: var(--color-input-bg);

  &::placeholder,
  &::-webkit-input-placeholder,
  &:-moz-placeholder {
    color: var(--color-secondary);
  }
}

:deep(label) {
  display: block;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 4px;
  font-weight: 500;
}

:deep(button) {
  border: none;
  border-radius: var(--border-radius-m);
  background-color: var(--color-primary);
  font-size: 18px;
  line-height: 26px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #ffffff;
  font-weight: 500;
}

:deep(strong) {
  font-weight: 500;
  color: var(--color-primary);
}

:deep(a) {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 500;
}

:deep(h1) {
  white-space: nowrap;
  font-size: 28px;
  font-weight: 500;
}
</style>

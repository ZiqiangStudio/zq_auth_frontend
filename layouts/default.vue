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
  padding: 12px 12px 12px 42px;
  border: none;
  border-radius: var(--border-radius-m);
  font-size: 15px;
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
  margin-bottom: 4px;
  font-weight: bold;
}

:deep(button) {
  border: none;
  border-radius: var(--border-radius-m);
  background-color: var(--color-primary);
  font-size: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #ffffff;
}

:deep(strong) {
  color: var(--color-primary);
}

:deep(a) {
  text-decoration: none;
  color: var(--color-primary);
}

:deep(h1) {
  white-space: nowrap;
  font-size: 28px;
}
</style>

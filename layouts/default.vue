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

.container:deep(input) {
  display: block;
  padding: 12px 12px 12px 42px;
  border: none;
  border-radius: var(--border-radius-m);
  font-size: 15px;
  background-color: var(--color-input-bg);
}

.container:deep(label) {
  display: block;
  font-size: 13px;
  margin-bottom: 4px;
  font-weight: bold;
}

.container:deep(button) {
  border: none;
  border-radius: var(--border-radius-m);
  background-color: var(--color-primary);
  font-size: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #FFFFFF;
}

.container:deep(strong) {
  color: var(--color-primary);
}

.container:deep(a) {
  text-decoration: none;
  color: var(--color-primary);
}

.container:deep(h1) {
  white-space: nowrap;
  font-size: 28px;
}
</style>

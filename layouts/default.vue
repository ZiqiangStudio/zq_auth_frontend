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

.container /deep/ input {
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 12px 0 12px 42px;
    border: none;
    border-radius: var(--border-radius-m);
    font-size: 15px;
    background-color: var(--color-input-bg);
}

.container /deep/ label {
  width: 100%;
  display: block;
  box-sizing: border-box;
  font-size: 13px;
  margin-bottom: 4px;
  font-weight: bold;
}

.container /deep/ button {
  margin-top: 38px;
  width: 100%;
  border: none;
  border-radius: var(--border-radius-m);
  background-color: var(--color-primary);
  font-size: 18px;
  padding: 8px 0;
  color: #FFFFFF;
}

.container /deep/ strong {
  color: var(--color-primary);
}

.container /deep/ a {
  text-decoration: none;
  color: var(--color-primary);
}

.container /deep/ h1 {
  font-size: 28px;
}
</style>

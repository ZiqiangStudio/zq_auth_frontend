<template>
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="less">
.lds-ring {
  display: inline-block;
  position: relative;
  width: 1em;
  height: 1em;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0.1em;
    left: 0.1em;
    width: 0.8em;
    height: 0.8em;
    margin: 0.1em;
    border: 0.1em solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }

    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>

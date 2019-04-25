<template>
  <div class="header-bar">
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderBar"
};
</script>

<style lang="scss" scoped>
.header-bar {
  width: 100%;
  height: 100%;
  position: relative;
  .custom-content-con {
    float: right;
    height: auto;
    padding-right: 20px;
    line-height: 64px;
    & > * {
      float: right;
    }
  }
}
</style>



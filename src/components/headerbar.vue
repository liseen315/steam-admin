<template>
  <div class="header-bar">
    <SiderTrigger icon="md-menu"></SiderTrigger>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SiderTrigger from "./siderTrigger";
export default {
  name: "HeaderBar",
  components: {
    SiderTrigger
  }
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



<template>
  <div class="header-bar">
    <SiderTrigger icon="md-menu"></SiderTrigger>
    <CustomBreadCrumb :list="breadCrumbList"></CustomBreadCrumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SiderTrigger from "./siderTrigger";
import CustomBreadCrumb from "./customBreadCrumb";
export default {
  name: "HeaderBar",
  components: {
    SiderTrigger,
    CustomBreadCrumb
  },
  computed: {
    breadCrumbList() {
      return this.$store.getters.breadCrumbList;
    }
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



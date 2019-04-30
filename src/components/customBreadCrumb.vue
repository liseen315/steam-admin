<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem
        v-for="item in list"
        :to="item.to"
        :key="`bread-crumb-${item.name}`"
      >{{ item.meta.title }}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  name: "CustomBreadCrumb",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-bread-crumb {
  display: inline-block;
  vertical-align: top;
}
</style>



<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.size {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

html {
  @extend .size;
}

body {
  @extend .size;
}
#app {
  width: 100%;
  height: 100%;
}
</style>

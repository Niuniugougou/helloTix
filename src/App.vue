<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
@import "~@/assets/style/font.css";
.ql-editor {
  min-height: 250px;
}
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-header
  .logo-group
  img {
  margin: 0;
  height: auto;
  width: 60%;
}
.ql-toolbar.ql-snow .ql-formats {
  line-height: 1;
}
.el-checkbox {
  margin-right: 0 !important;
}
.marg-lft {
  margin-left: 5px !important;
}
</style>

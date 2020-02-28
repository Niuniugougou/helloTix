<template>
  <d2-container>
    hello Tix
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      filename: __filename,
    }
  },
  mounted: function() {
    this.$router.push({
        path: "/admin/workbench" //跳转的路径
      });
  }
};
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>

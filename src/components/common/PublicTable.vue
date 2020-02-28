<template>
  <div style="text-align:center;">
    <div style="overflow:auto;height:540px;">
      <Table border :columns="columns" :data="tableData"></Table>
    </div>
    <el-pagination
      style="margin-top:40px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    page: Number,
    size: Number,
    columns: Array,
    tableData: Array,
    handleSizeChange: Function,
    handleCurrentChange: Function,
    viewInfo: Function,
    deleteInfo: Function,
    editInfo: Function
  }
};
</script>
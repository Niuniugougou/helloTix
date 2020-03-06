<template>
  <div>
    <h3>1.表格嵌套输入框。</h3>
      <el-table
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="类型" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最大值" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.maxReference"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="最小值" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.minReference"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTableData">保 存</el-button>
      </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      selectData: [],
      userDefinedData: [
        { typeName: "PH值", maxReference: 10, minReference: 1 },
        { typeName: "温度", maxReference: 11, minReference: 1 }
      ]
    };
  },
  mounted() {
    this.tableData = this.userDefinedData;
  },
  methods: {
    saveTableData() {
      let i = 0;
      this.selectData.length == 0
        ? this.$message.error("未选中任何选项!")
        : this.selectData.map(item => {
            if (item.minReference == "" || item.maxReference == "") {
              i++;
            }
          })
      i != 0
        ? this.$message.error("选中选项的值不可以为空!")
        : window.console.log(this.userDefinedData);
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    show(stated, list) {
      this.selectData = list;
    },
  }
};
</script>
<style lang="scss" scoped></style>
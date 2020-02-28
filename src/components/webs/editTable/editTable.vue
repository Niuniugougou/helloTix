<template>
  <d2-container>
    <el-button @click="open">打开</el-button>
    <el-dialog
      title="监测类型设置"
      :visible.sync="editTableDis"
      v-if="editTableDis"
      width="60%"
      center
      :show-close="false"
      :close-on-press-escape="false"
    >
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
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      editTableDis: false,
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
    // saveTableData() {
    //   let i = 0;
    //   if (this.selectData.length == 0) {
    //     this.$message.error("未选中任何选项");
    //   } else {
    //     this.selectData.map(item => {
    //       if (item.minReference == "" || item.maxReference == "") {
    //         i++;
    //       }
    //     });
    //     if (i != 0) {
    //       this.$message.error("选中选项的值不可以为空");
    //     } else {
    //       window.console.log(this.userDefinedData);
    //     }
    //   }
    // },
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
      this.editTableDis = true;
    },
    open() {
      this.editTableDis = !this.editTableDis;
    }
  }
};
</script>
<style lang="scss" scoped></style>
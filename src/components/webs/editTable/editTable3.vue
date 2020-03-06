<template>
  <div>
    <h3>3.编辑一行。</h3>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      :cell-style="changeColor"
      :header-cell-style="changeHeaderColor"
      :row-style="changRowColor"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column class="td-th" label="时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.date" :disabled="isEditObj[scope.$index].a"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="问题">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" :disabled="isEditObj[scope.$index].a"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="282px">
        <template slot-scope="scope">
          <div v-show="isEditObj[scope.$index].a">
            <el-button
              type="text"
              icon="el-icon-s-claim"
              size="small"
              @click="editUserInfo(scope.$index)"
            >编辑</el-button>&nbsp;|
            <el-button type="text" icon="el-icon-edit-outline" size="small" @click="details(scope.row)">详情</el-button>&nbsp;|
            <el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
          </div>
          <div v-show="!isEditObj[scope.$index].a">
            <el-button
              type="text"
              icon="el-icon-s-claim"
              size="small"
              @click="checkEditUserInfo(scope.$index)"
            >保存</el-button>&nbsp;|
            <el-button
              type="text"
              icon="el-icon-edit-outline"
              size="small"
              @click="cancelEditUserInfo(scope.$index)"
            >取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditObj: [],
      changeHeaderColor: {
        color: 'red'
      },
      changRowColor: {
        color: 'blue'
      },
      changeColor: {
        color: 'black'
      },
      tableData: [
        {
          name: '321',
          date: '123'
        },
        {
          name: '1',
          date: '2'
        }
      ]
    };
  },
  mounted() {
    for (let i in this.tableData) {
      let a = "edit" + i;
      this.isEditObj.push({
        a: true
      });
    }
  },
  methods: {
    editUserInfo(index) {
      this.isEditObj[index].a = false;
    },
    checkEditUserInfo(index) {
      //编辑用户信息
      this.isEditObj[index].a = true;
    },
    cancelEditUserInfo(index) {
      this.isEditObj[index].a = true;
    },
    handleSelectionChange(data) {
      console.log('handleSelectionChange:' + JSON.stringify(data))
    },
    details(row) {
      console.log('row:' + JSON.stringify(row))
    }
  }
};
</script>
<style lang="scss" scoped></style>
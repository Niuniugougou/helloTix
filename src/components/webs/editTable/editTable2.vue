<template>
  <div>
    <h3>2.使用替换的方式编辑一格。</h3>
    <el-table :data="tableData" highlight-current-row border :height="tableHeight">
      <el-table-column
        prop="info.name"
        label="名称"
        align="center"
        class="compileNameFather"
        width="230"
      >
        <template slot-scope="scope">
          <div class="headerFirst">
            {{scope.row.info.name}}
            <i
              class="el-icon-edit-outline eidtIcon"
              @click="tableDbEdit(scope.$index)"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量" align="center"></el-table-column>
      <el-table-column prop="lastAnalyze" label="时间" align="center"></el-table-column>
      <el-table-column label="白名单" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.info.name">启用</span>
          <span v-else class="colorStatus">停用</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: "200px",
      tableData: [
        {
          info: {
            name: "二狗"
          },
          number: 33,
          lastAnalyze: "18:00"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row)
    },
    tableDbEdit(index) {
      //index为索引号
      var cellabc = document.getElementsByClassName("headerFirst")[index];
      cellabc.innerHTML = "";
      let cellInput = document.createElement("el-input");
      let cellInputSon = document.createElement("input");
      let cellBut = document.createElement("button");
      let ibtu = document.createElement("i");
      cellInputSon.value = this.tableData[index].info.name;
      cellabc.setAttribute("class", "cellBoxdev");
      ibtu.setAttribute("class", "el-icon-check");
      cellInputSon.setAttribute("class", "el-input__inner compileName");
      cellBut.setAttribute(
        "class",
        "el-button el-button--warning el-button--mini"
      );
      cellBut.innerText = "成功";
      cellInput.style.width = "100%";
      ibtu.style.marginLeft = "3px";
      cellInputSon.style.width = "60%";
      cellInputSon.style.padding = "0 5px 0 0";
      cellInputSon.style.border = "1px solid transparent";
      cellInputSon.style.marginRight = "6px";
      this.clickButSty = true;
      cellInput.appendChild(cellInputSon);
      cellabc.appendChild(cellInput);
      cellInput.appendChild(cellBut);
      cellBut.appendChild(ibtu);
      cellBut.onclick = () => {
        //成功按钮事件
        cellabc.removeChild(cellInput);
        this.tableData[index].info.name = cellInputSon.value;
        cellabc.innerHTML = this.tableData[index].info.name;
        console.log("row", this.tableData[index]);
        let ibtuIcon = document.createElement("i");
        ibtuIcon.setAttribute("class", "el-icon-edit-outline eidtIcon");
        cellabc.appendChild(ibtuIcon);
        cellabc.setAttribute("class", "headerFirst");
        ibtuIcon.onclick = () => {
          this.tableDbEdit(index);
        };
      };
    }
  }
};
</script>
<style lang="scss" scoped></style>
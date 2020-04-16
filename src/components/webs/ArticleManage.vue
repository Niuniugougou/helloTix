<template>
  <d2-container class="table">
    <el-row>
      <el-input
        v-model="search_name"
        clearable
        placeholder="搜索标题"
        style="width:auto;margin-bottom:20px;"
      ></el-input>
      <el-button
        icon="el-icon-search"
        circle
        size="small"
        style="margin-left:20px;"
        @click="searchByName"
      ></el-button>
    </el-row>
    <el-row>
      <PublicTable
        :total="total"
        :page="pageNum"
        :size="pageSize"
        :columns="columns"
        :tableData="dataList"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      ></PublicTable>
    </el-row>

  </d2-container>
</template>

<script>
import { articleManage } from "@/api/article_manage";
import PublicTable from "@/components/common/PublicTable";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "articleManage"
);
export default {
  name: "articleManage",
  components: {
    PublicTable
  },
  data() {
    return {
      search_name: "",
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "类型",
          key: "typeName"
        },
        {
          title: "简介",
          key: "summary"
        },
        {
          title: "作者",
          key: "author_name"
        },
        {
          title: "状态",
          key: "state"
        },
        {
          title: '创建时间',
          key: "create_time"
        },
        {
          title: "操作",
          key: "action",
          width: 210,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h("Button",
                {
                  props: {
                    size: "small",
                    type: 'primary'
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editPage(params);
                    }
                  }
                },
                "编辑"
              ),
              h("Button",
                {
                  props: {
                    size: "small",
                    type: 'warning'
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$confirm("确认此操作？")
                        .then(_ => {
                          console.log(params);
                          if (params.row.state == "正常") {
                            this.deleteOrStart({ that: this,  state: "1",  id: params.row.id});
                          } else {
                            this.deleteOrStart({ that: this,  state: "0",  id: params.row.id});
                          }
                          setTimeout(() => {
                            this.getDataListAsync({ that: this });
                          }, 550);
                        })
                        .catch(_ => {});
                    }
                  }
                },
                params.row.state == '正常' ? "停用" : "启用"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.getDataListAsync({ that: this });
  },
  computed: {
    ...mapState(["total", "pageSize", "pageNum", "dataList"])
  },
  methods: {
    editPage(params) {
      this.$router.push({
        path: "/admin/edit",
        query: { id: params.row.id,pageSize: this.pageSize,pageNum: this.pageNum,total: this.total }
      });
    },
    searchByName() {
      this.searchNameChange(this.search_name);
      this.getDataListAsync({ that: this });
    },
    ...mapActions(["getDataListAsync","deleteOrStart"]),
    ...mapMutations(["sizeChange", "currentChange", "searchNameChange"]),
    handleSizeChange(val) {
      this.sizeChange(val);
      this.getDataListAsync({ that: this });
    },
    handleCurrentChange(val) {
      this.currentChange(val);
      this.getDataListAsync({ that: this });
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.mr10 {
  margin-left: 10px;
}
.red {
  color: #ff0000;
}
</style>

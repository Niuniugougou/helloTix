<template>
  <d2-container class="table">
    <el-row>
      <el-input
        v-model="search_name"
        v-if="false"
        clearable
        placeholder="搜索用户名"
        style="width:auto;margin-bottom:20px;"
      ></el-input>
      <el-select v-model="search_state" clearable placeholder="按状态搜索" style="width:auto;margin-bottom:20px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
import { commentsManage } from "@/api/comments_manage";
import PublicTable from "@/components/common/PublicTable";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "commentsManage"
);
export default {
  name: "commentsManage",
  components: {
    PublicTable
  },
  data() {
    return {
      options: [{
        value: '0',
        label: '启用'
      }, {
        value: '1',
        label: '未启用'
      }],
      search_state:'',
      search_name: "",
      columns: [
        {
          title: "id",
          key: "comments_id"
        },
        {
          title: "所属文章名称",
          key: "title"
        },
        {
          title: "类型",
          key: "typeName"
        },
        {
          title: "评论内容",
          key: "comments_content"
        },
        {
          title: "回复内容",
          key: "repeat_content"
        },
        {
          title: "评论人id",
          key: "from_uid"
        },
        {
          title: "被评论人id",
          key: "to_uid"
        },
        {
          title: "状态",
          key: "state"
        },
        {
          title: "回复状态",
          key: "repeat_state",
          render: (h,params) => {
            return h("div",[
              h("span",
                {
                  style: {
                    color: "black"
                  }
                },
                params.row.repeat_content?'已回复':'未回复'
              )
            ])
          }
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
                          if (params.row.state == "启用") {
                            this.deleteOrStart({ that: this,  state: "1",  id: params.row.comments_id});
                          } else {
                            this.deleteOrStart({ that: this,  state: "0",  id: params.row.comments_id});
                          }
                          setTimeout(() => {
                            this.getDataListAsync({ that: this });
                          }, 550);
                        })
                        .catch(_ => {});
                    }
                  }
                },
                params.row.state == '启用' ? "停用" : "启用"
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
      // this.$router.push({
      //   path: "/admin/edit",
      //   query: { id: params.row.id,pageSize: this.pageSize,pageNum: this.pageNum,total: this.total }
      // });
      console.log(params,'编辑')
    },
    searchByName() {
      this.searchNameChange(this.search_name);
      this.stateChange(this.search_state);
      this.getDataListAsync({ that: this });
    },
    ...mapActions(["getDataListAsync","deleteOrStart"]),
    ...mapMutations(["sizeChange", "currentChange", "searchNameChange", "stateChange"]),
    handleSizeChange(val) {
      this.sizeChange(val);
      this.getDataListAsync({ that: this });
    },
    handleCurrentChange(val) {
      this.currentChange(val);
      this.getDataListAsync({ that: this });
    }
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

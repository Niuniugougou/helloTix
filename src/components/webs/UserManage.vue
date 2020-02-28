<template>
  <d2-container class="table">
    <el-row>
      <el-input v-model="search_name" clearable placeholder="搜索用户名" style="width:auto;margin-bottom:20px;"></el-input>
      <el-button icon="el-icon-search" circle size="small" style="margin-left:20px;" @click="searchByName"></el-button>
    </el-row>
    <el-row>
      <PublicTable
        :total="total"
        :page="pageNum"
        :size="pageSize"
        :columns="columns"
        :tableData="userList"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      ></PublicTable>
    </el-row>
  </d2-container>
</template>

<script>
import { userManage } from "@/api/user_manage";
import PublicTable from "@/components/common/PublicTable";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "userManage"
);
export default {
  name: "usermanage",
  components: {
    PublicTable
  },
  data() {
    return {
      search_name: '',
      columns: [
        {
          title: "id",
          key: "uid"
        },
        {
          title: "用户名",
          key: "nickname"
        },
        {
          title: "位置",
          key: "location"
        },
        {
          title: "电话",
          key: "phone_num"
        },
        {
          title: "省",
          key: "province"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "状态",
          key: "state"
        },
        // {
        //   title: "openid",
        //   key: "wx_openId"
        // },
        // {
        //   title: "昵称",
        //   key: "wx_nickname"
        // },
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
                    size: "small"
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
                        .then( _ => {
                          console.log(params)
                          if (params.row.state == '正常') {
                            this.deleteOrStart({ that: this, state: '1' ,id: params.row.uid});
                          } else {
                            this.deleteOrStart({ that: this, state: '0' ,id: params.row.uid});
                          }
                          setTimeout(() => {
                            this.getDataListAsync({ that: this });
                          }, 550);
                        })
                        .catch( _ => {});
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
    ...mapState(["total", "pageSize", "pageNum", "userList","userName"])
  },
  methods: {
    editPage() {
      this.$message.error('暂时不提供修改功能！');
    },
    searchByName() {
      this.userNameChange(this.search_name);
      this.getDataListAsync({ that: this });
    },
    ...mapActions(["getDataListAsync","deleteOrStart"]),
    ...mapMutations(["sizeChange", "currentChange", "userNameChange"]),
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
</style>

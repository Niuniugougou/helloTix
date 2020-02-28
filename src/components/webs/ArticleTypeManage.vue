<template>
  <d2-container class="table">
    <el-row>
      <el-input v-model="search_name" clearable placeholder="搜索类型名" style="width:auto;margin-bottom:20px;"></el-input>
      <el-button icon="el-icon-search" circle size="small" style="margin-left:20px;" @click="searchByName"></el-button>
      <el-button icon="el-icon-circle-plus-outline" circle size="small" title="新增类型" @click="addNew"></el-button>
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
    <el-dialog v-dialogDrag :title="addOrUpdate" :visible.sync="dialogVisible" v-if="dialogVisible" width="460px" :show-close="false" :close-on-press-escape="false">
      <el-form ref="formtype" :model="formtype" :rules="rules">
        <el-form-item label="类型名称" label-width="120px" prop="input_type">
					<el-input v-model="formtype.input_type" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSend">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { articleTypeManage } from "@/api/article_type_manage";
import PublicTable from "@/components/common/PublicTable";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "articleTypeManage"
);
export default {
  name: "articleTypeManage",
  components: {
    PublicTable
  },
  data() {
    return {
      currentId: '',
      addOrUpdate: '新增',
			formtype: {
				input_type: ''
			},
			rules: {
        input_type: [
          { required: true, message: "请输入类型", trigger: "blur" }
        ],
      },
			dialogVisible: false,
      search_name: '',
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "文章类型名称",
          key: "type_name"
        },
        {
          title: "状态",
          key: "state"
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
                          if (params.row.state == '正常') {
                            this.deleteOrStart({ that: this, state: '1' ,id: params.row.id});
                          } else {
                            this.deleteOrStart({ that: this, state: '0' ,id: params.row.id});
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
    ...mapState(["total", "pageSize", "pageNum", "dataList"]),
    addOrUpdateCom() {
      return this.addOrUpdate == '新增' ? '新增':'编辑'
    }
  },
  methods: {
		async confirmSend() {
			if(!!this.formtype.input_type) {
        if(this.addOrUpdate == '新增') {
          let data = {
            type_name: this.formtype.input_type,
            state: '0',
          }
          let res = await articleTypeManage.articleTypeSave(data);
          if (res.code != 200) { return this.$message.error(res.msg);}
          this.$message.success(res.message);
          this.dialogVisible = !this.dialogVisible;
          this.getDataListAsync({ that: this });
        } else {
          let data = {
            id: this.currentId,
            type_name: this.formtype.input_type,
          }
          let res = await articleTypeManage.articleTypeUpdate(data);
          if (res.code != 200) { return this.$message.error(res.msg);}
          this.$message.success(res.message);
          this.dialogVisible = !this.dialogVisible;
          this.getDataListAsync({ that: this });
        }
			}else {
				this.$message.error('请填写。')
			}
		},
    addNew() {
      this.addOrUpdate = '新增';
			this.dialogVisible = !this.dialogVisible;
			this.formtype.input_type = '';
		},
		handleClose() {

		},
    editPage(params) {
      this.addOrUpdate = '编辑';
      this.dialogVisible = !this.dialogVisible;
      this.formtype.input_type = params.row.type_name;
      this.currentId = params.row.id;
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
    }
  }
};
</script>

<style scoped>
</style>

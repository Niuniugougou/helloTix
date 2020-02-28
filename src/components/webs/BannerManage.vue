<template>
  <d2-container class="table">
    <el-row>
      <el-button
        icon="el-icon-plus"
        circle
        size="small"
        style="margin-bottom:20px;"
        @click="addNewOne"
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
    <el-dialog title="轮播图" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form ref="article" :model="article" :rules="rules">
        <el-form-item label="文章链接" prop="article_url" label-width="80px">
          <el-input
            type="text"
            placeholder="请输入文章链接"
            v-model="article.article_url"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="write_title" label-width="80px">
          <el-input
            type="text"
            placeholder="请输入标题"
            v-model="article.write_title"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="second_title" label-width="80px">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入简介"
            v-model="article.second_title"
            maxlength="80"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="http://127.0.0.1:7001/file/upload"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <div class="demo-upload-list" v-for="item in uploadList" :key="item.id">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="visible" append-to-body width="95%" v-if="visible">
      <!-- <el-image :src="imgurl"></el-image> -->
      <CropperOne :imgurl="imgurl" style="height:800px;"></CropperOne>
    </el-dialog>
  </d2-container>
</template>

<script>
import CropperOne from "@/components/common/CropperOne"
import { bannerManage } from "@/api/banner_manage";
import PublicTable from "@/components/common/PublicTable";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "bannerManage"
);
export default {
  name: "BannerManage",
  components: {
    PublicTable,
    CropperOne
  },
  data() {
    return {
      baseURL: "http://127.0.0.1:7001",
      defaultList: [],
      visible: false,
      uploadList: [],
      imgurl: "",
      currentId: "",
      type_option: [],
      article: {
        write_title: "",
        second_title: "",
        article_url: ""
      },
      rules: {
        write_title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        second_title: [
          { required: true, message: "请输入简介", trigger: "blur" }
        ],
        article_url: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
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
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "操作",
          key: "action",
          width: 210,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary"
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
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "warning"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$confirm("确认此操作？")
                        .then(_ => {
                          if (params.row.state == "正常") {
                            this.deleteOrStart({
                              that: this,
                              state: "1",
                              id: params.row.id
                            });
                          } else {
                            this.deleteOrStart({
                              that: this,
                              state: "0",
                              id: params.row.id
                            });
                          }
                          setTimeout(() => {
                            this.getDataListAsync({ that: this });
                          }, 550);
                        })
                        .catch(_ => {});
                    }
                  }
                },
                params.row.state == "正常" ? "停用" : "启用"
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
    //文件上传相关
    handleView(name) {
      this.visible = true;
    },
    handleRemove(file) {
      this.uploadList = [];
    },
    handleSuccess(res, file) {
      this.imgurl = this.baseURL + "/app/public/uploadfile/" + res.data.filename;
      file.url = this.baseURL + "/app/public/uploadfile/" + res.data.filename;
      file.name = res.data.filename;
      this.uploadList.push({
        url: file.url,
        name: file.name,
        status: "finished"
      });
    },
    handleFormatError(file) {
      this.$message.error(
        "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      );
    },
    handleMaxSize(file) {
      this.$message.error(
        "File  " + file.name + " is too large, no more than 2M."
      );
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$message.error("只能上传一张.");
      }
      return check;
    },
    //文件上传相关

    async updateArticle() {
      let data = {
        id: this.currentId,
        title: this.article.write_title,
        second_title: this.article.second_title,
        author: localStorage.getItem("ms_username"),
        article_url: this.article.article_url,
        img_url: this.imgurl
      };
      let res = await bannerManage.bannerUpdate(data);
      if (res.code != 200) {
        return this.$message.error(res.msg);
      }
      this.$message.success(res.message);
      this.getDataListAsync({ that: this });
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    async addNewArticle() {
      let data = {
        title: this.article.write_title,
        second_title: this.article.second_title,
        author: localStorage.getItem("ms_username"),
        article_url: this.article.article_url,
        img_url: this.imgurl
      };
      let res = await bannerManage.bannerSave(data);
      if (res.code != 200) {
        return this.$message.error(res.msg);
      }
      this.$message.success(res.message);
      this.getDataListAsync({ that: this });
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    submitData() {
      if (this.currentId != "") {
        this.updateArticle();
      } else {
        this.addNewArticle();
      }
    },
    addNewOne() {
      this.currentId = "";
      Object.assign(this.article, {
        write_title: "",
        second_title: "",
        article_url: ""
      });
      this.uploadList = [];
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    editPage(params) {
      this.uploadList = [];
      this.currentId = params.row.id;
      this.dialogFormVisible = !this.dialogFormVisible;
      Object.assign(this.article, {
        write_title: params.row.title,
        second_title: params.row.summary,
        article_url: params.row.article_url
      });
      if (params.row.img_url) {
        this.uploadList.push({
          url: params.row.img_url,
          name: params.row.title,
          status: "finished"
        });
      }
      this.imgurl = params.row.img_url;
    },
    ...mapActions(["getDataListAsync", "deleteOrStart"]),
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
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

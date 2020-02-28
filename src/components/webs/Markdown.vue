<template>
  <d2-container>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>mavonEditor markdown编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="role" :model="role" :rules="rules">
        <el-form-item label="题目" prop="write_title">
          <el-input
            type="text"
            placeholder="请输入题目"
            v-model="role.write_title"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>

      <mavon-editor
        v-model="content"
        ref="md"
        @imgAdd="$imgAdd"
        @change="change"
        style="min-height: 600px;margin-top:20px;"
      />
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </d2-container>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { addMarkData } from '@/api/allactions'
export default {
  name: "markdown",
  data: function() {
    return {
      content: "",
      html: "",
      configs: {},
      role: {
        write_title: ''
      },
      rules: {
        write_title: [
          { required: true, message: "请输入题目", trigger: "blur" }
        ],
      }
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    submit() {
      var _this = this;
      var currentdate = new Date().toLocaleString();
      let resData = {
        username: localStorage.getItem("ms_username"),
        creattime: currentdate,
        markdata: _this.html,
        tittle: _this.role.write_title
      };
      if (_this.html) {
        addMarkData(resData)
          .then((res) => {
            _this.$message.success(res.message);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        _this.$message.error('请输入内容。');
      }
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>
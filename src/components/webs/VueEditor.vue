<template>
  <d2-container>
    <div class="container" style="margin-top:20px;">
      <el-form ref="article" :model="article" :rules="rules">
        <el-form-item label="分类" prop="article_type" label-width="70px">
          <el-select v-model="article.article_type" placeholder="请选择">
            <el-option
              v-for="item in type_option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="write_title" label-width="70px">
          <el-input
            type="text"
            placeholder="请输入标题"
            v-model="article.write_title"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="简介" prop="second_title" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入简介"
            v-model="article.second_title"
            maxlength="80"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content" label-width="70px">
          <quill-editor ref="QuillEditor" v-model="content" :options="editorOption"></quill-editor>
        </el-form-item>
      </el-form>
      <Upload
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png','gif']"
          :max-size="2048"
          multiple
          action="http://127.0.0.1:7001/file/upload"
          >
          <Button icon="ios-cloud-upload-outline" ></Button>
      </Upload>
      
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </d2-container>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { articleManage } from "@/api/article_manage";
import { articleTypeManage } from "@/api/article_type_manage";

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],              
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}], 
  [{'indent': '-1'}, {'indent': '+1'}],  
  [{'direction': 'rtl'}], 

  [{'size': ['small', false, 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']
]
export default {
  name: "editor",
  data: function() {
    return {
      baseURL: 'http://127.0.0.1:7001',
      content: "",
      editorOption: {
        placeholder: "你好 tix。",
        modules: {
          toolbar: {
            container: toolbarOptions,  // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                    // 调用iview图片上传
                    document.querySelector('.ivu-upload .ivu-btn').click()
                } else {
                    this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      type_option: [],
      article: {
        write_title: '',
        second_title: '',
        article_type: ''
      },
      rules: {
        write_title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        second_title: [ { required: true, message: "请输入简介", trigger: "blur" }],
        content: [ { required: true, message: "请输入正文", trigger: "blur" }],
        article_type: [ { required: true, message: "请选择类型", trigger: "blur" }],
      }
    };
  },
  components: {
    quillEditor
  },
  mounted() {
    this.getAllType();
    this.isContent();
  },
  methods: {
    async isContent() {
      if(this.$route.query.id) {
        let data = {
          pageSize: this.$route.query.pageSize,
          pageNum: this.$route.query.pageNum,
          searchName: ''
        }
        let res = await articleManage.getAllArticle(data);
        if (res.code != 200) { return that.$message.error(res.msg)};
        res.dataList.map(item => {
          if(item.id == this.$route.query.id) {
            this.article = Object.assign({},this.article,{
              write_title: item.title,
              second_title: item.summary,
              article_type: item.type
            })
            this.content = item.content;
          }
        })
      }else{
        return
      }
    },
    async getAllType() {
      let data = {
        pageSize: 50,
        pageNum: 1,
        searchName: ''
      }
      let res = await articleTypeManage.getAllArticleType(data);
      if(res.code != 200) { return this.$message.error(res.msg) }
      this.type_option = [];
      res.dataList.map(item => {
        if(item.state == '0') {
          this.type_option.push({value:item.id.toString(),label:item.type_name})
        }
      })
    },
    handleSuccess (res) {
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      if (res) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, 'image', this.baseURL+'/app/public/uploadfile/'+res.data.filename)
          // 调整光标到最后
          quill.setSelection(length + 1)
      } else {
          // 提示信息，需引入Message
          Message.error('图片插入失败')
      }
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    async submit() {
      if (this.content) {
        if(this.$route.query.id) {
          this.updateArticle();
        }else {
          this.addNewArticle();
        }
      } else {
        this.$message.error("请输入正文内容。");
      }
    },
    //更新
    async updateArticle() {
      let data = {
        id: this.$route.query.id,
        title: this.article.write_title,
        second_title: this.article.second_title,
        content: this.content,
        author: localStorage.getItem("ms_username"),
        article_type: this.article.article_type
      }
      let res = await articleManage.articleUpdate(data);
      if (res.code != 200) { return this.$message.error(res.msg);}
      this.$message.success(res.message);
    },
    //新增
    async addNewArticle() {
      let data = {
        title: this.article.write_title,
        second_title: this.article.second_title,
        content: this.content,
        author: localStorage.getItem("ms_username"),
        edit_type: 'quillEditor',
        article_type: this.article.article_type
      }
      let res = await articleManage.articleSave(data);
      if (res.code != 200) { return this.$message.error(res.msg);}
      this.$message.success(res.message);
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
.el-input{
  width: 54%;
}
.ivu-upload {
    display: none;
}
</style>
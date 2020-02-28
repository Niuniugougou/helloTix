<template>
  <d2-container class="table">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
      <el-form-item label="目标地址" prop="htmlUrl">
        <el-input v-model="ruleForm.htmlUrl"></el-input>
      </el-form-item>
      <el-form-item label="标题元素路径" prop="titleUrl">
        <el-input v-model="ruleForm.titleUrl"></el-input>
      </el-form-item>
      <el-form-item label="副标题元素路径" prop="secondTitleUrl">
        <el-input v-model="ruleForm.secondTitleUrl"></el-input>
      </el-form-item>
      <el-form-item label="正文元素路径" prop="contentUrl">
        <el-input v-model="ruleForm.contentUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">开始</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" width="30%" style="text-align: center;">
      <el-progress type="circle" :percentage="percent" :color="colors"></el-progress>
    </el-dialog>
  </d2-container>
</template>

<script>
import { CrawlerAPI } from "@/api/crawler";
export default {
  name: "articleCrawler",
  data() {
    return {
      dialogVisible: false,
      interval: null,
      percent: 0,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      ruleForm: {
        htmlUrl: "",
        titleUrl: "",
        secondTitleUrl: "",
        contentUrl: ""
      },
      rules: {
        htmlUrl: [
          { required: true, message: "目标地址不为空", trigger: "blur" }
        ],
        titleUrl: [
          { required: true, message: "标题元素路径不为空", trigger: "blur" }
        ],
        secondTitleUrl: [
          { required: true, message: "副标题元素路径不为空", trigger: "blur" }
        ],
        contentUrl: [
          { required: true, message: "正文元素路径不为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  computed: {
    color() {
      let color = "#2db7f5";
      if (this.percent == 100) {
        color = "#5cb85c";
      }
      return color;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.circleChange(true);
          CrawlerAPI.saveCrawlerArticle(this.ruleForm).then(item => {
            if(item.message || item.errorMsg) {
              this.circleChange(false);
              item.errorMsg == undefined ? this.$message.success(item.message) : this.$message.error(item.errorMsg)
            }
          });
        } else {
          this.$message.error("请填写数据字段。");
          return false;
        }
      });
    },
    circleChange(val) {
      if(val) {
        this.percent = 0;
        this.dialogVisible = !this.dialogVisible;
        this.interval = setInterval(() => {
          if (this.percent >= 90) {
            // clearInterval(this.interval);
            // this.interval = null;
            if(this.percent == 99) {
              this.percent = 99
            }else{
              this.percent += 1;
            }
            return;
          } else {
            this.percent += 10;
          }
        }, 500);
      }else {
        console.log(1111111111)
        clearInterval(this.interval);
        this.interval = null;
        this.dialogVisible = false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>

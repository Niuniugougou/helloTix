<template>
  <div class="leaderInfo">
    <el-row :gutter="20" style="margin-top: -25px; margin-bottom: -25px;">
      <el-col :span="12">
        <el-upload
          class="upload-radio"
          :action="uploadUrl"
          :data="upLoadData"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :beforeUpload="beforeAvatarUpload"
          :on-error="uploadError"
          :on-success="uploadSuccess"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <div class="leaderInfors">领导简介：</div>
        <el-input type="textarea" :rows="6" placeholder="暂无" v-model="textareaData"></el-input>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitFormAdd" :disabled="disabledDoubleClick">确 定</el-button>
      <el-button @click="$emit('closeDialog')">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { onlineInterview } from "@/api/allactions";
export default {
  name: "leaderInfo",
  props: {
    currentId: String,
    leaderMessage: String,
    leaderImg: String
  },
  data() {
    return {
      //解决双击多次提交
      disabledDoubleClick: false,
      dialogVisible: false,
      // http://112.74.35.81:20001
      uploadUrl:
        "/communication/api-common/file/upload",
      upLoadData: {
        bizType: "INTERVIEW_LEADER"
      },
      fileList: [],
      textareaData: "",
      arr: [],
      cid: '',
      imgpath: ''
    };
  },
  watch: {
    leaderMessage: {
      handler: function(val, oldval) {
        if (val != oldval) {
          this.$nextTick(() => {
            this.textareaData = val;
          });
        }
      },
      immediate: true,
      deep: true
    },
    currentId: {
      handler: function(val, oldval) {
        if (val != oldval) {
          this.$nextTick(() => {
            this.cid = val;
          });
        }
      },
      immediate: true,
      deep: true
    },
    leaderImg: {
      // http://112.74.35.81:20001
      handler: function(val, oldval) {
        if (val != oldval) {
          this.$nextTick(() => {
            if(val){
              this.fileList = [{name:val,url:"/communication/api-common/file/download?path=" + val}]
            }else{
              this.fileList = [];
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
  },

  mounted: function() {},
  methods: {
    //图片移除
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      // console.log(file);
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      var _this = this;
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        _this.$message.error("上传模板大小不能超过 1MB!");
      }
      return isLt2M;
    },
    // 上传错误
    uploadError(response, file, fileList) {
      // console.log("上传失败，请重试！");
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      //这个只能拿来回显用，传数据用下面那个 http://112.74.35.81:20001
      this.fileList.push({
        name: response.data.fileName,
        url:
          "/communication/api-common/file/download?path=" +
          response.data.path,
        description: ""
      });
      this.arr = [];
      this.arr.push({
        description: this.textareaData,
        fileName: response.data.fileName,
        path: response.data.path,
        size: response.data.size,
        type: response.data.type
      });
    },
    newLeaderInfo() {
      this.dialogVisible = true;
    },
    submitFormAdd() {
      var _this = this;
      _this.disabledDoubleClick = true;
      if (_this.fileList.length != 0) {
        _this.fileList[0].description = _this.textareaData;
      }
      if (_this.arr.length == 0) {
        _this.$message.error('图片不允许为空。');
        _this.disabledDoubleClick = false;
      }else{
        _this.arr[0].description = _this.textareaData;
        let resData = {
          id: _this.cid,
          fileProperties: _this.arr
        };
        onlineInterview.sunmitLeaderInfo(resData).then(res => {
          _this.disabledDoubleClick = false;
          if (res.status == "success") {
            _this.$message.success("新建成功。");
          } else {
            _this.$message.error(res);
          }
          _this.$emit("closeDialog");
        });
      }


    }
  }
};
</script>
<style scoped>
.leaderInfo {
  display: inline;
  margin-left: 10px;
}
.leaderInfors {
  font-size: 16px;
}
</style>

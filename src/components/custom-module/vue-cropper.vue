<template>
  <d2-container>
    <div style="display:flex;">
      <div class="info-item" style="flex:1;">
        <div style="width:120px;height:120px;border-radius:50%;overflow:hidden;margin-left:123px;border:1px solid #ddd">
          <el-image 
            style="width: 120px; height: 120px"
            :src="headImg" 
            :preview-src-list="srcList"
            alt="头像">
          </el-image>
        </div>
      </div>
      <div class="info-item" style="flex:1;margin-left:-160px;margin-top:30px;">
        <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;cursor: pointer;">选择图片</label>
        <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
          <el-input type="button" class="oper" value="+" @click.native="changeScale(1)"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
          <el-input type="button" class="oper" value="-" title="" @click.native="changeScale(-1)"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="左旋转" placement="bottom">
          <el-input type="button" class="oper" value="↺" title="" @click.native="rotateLeft"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="右旋转" placement="bottom">
          <el-input type="button" class="oper" value="↻" title="" @click.native="rotateRight"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
          <el-input type="button" class="oper" value="↓" title="" @click.native="down('blob')"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="上传头像" placement="bottom">
          <el-input type="button" class="btn btn-blue" value="上传头像" @click.native="finish('blob')"/>
        </el-tooltip>
        <div class="line" style="margin-left: -280px;margin-top: 85px;">
          <div class="cropper-content" style="margin-top:-60px;margin-left:260px;">
            <div class="cropper">
              <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixedBox="option.fixedBox"
                @realTime="realTime"
                @imgLoad="imgLoad"
              ></vueCropper>
            </div>
            <div style="margin-left:20px;">
              <div class="show-preview" :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}">
                <div :style="previews.div" class="preview">
                  <img :src="previews.url" :style="previews.img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialog = true">编辑</el-button>
          </div>
          <div class="text item">
            名称：liutianxiang
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer
      title="编辑信息"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
      >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </d2-container>
</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import { updateAdminInfo,getAdminInfo } from "@/api/allactions/index"
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',
        timer: null,
        dialog: false,
        loading: false,
        srcList: [],
        headImg:'',
        //剪切图片上传
        crap: false,
        previews: {},
        option: {
          img: '',
          outputSize:1, //剪切后的图片质量（0.1-1）
          full: false,//输出原图比例截图 props名full
          outputType: 'png',
          canMove: true, 
          original: false, 
          canMoveBox: true, 
          autoCrop: true, 
          autoCropWidth: 150, 
          autoCropHeight: 150, 
          fixedBox: true 
        }, 
        fileName:'',  //本机文件地址
        downImg: '#',
        imgFile:'',
        uploadImgRelaPath:'', //上传后的图片的地址（不带服务器域名）
      }
    },
    components: { 
      VueCropper 
    }, 
    mounted() {
      let resData = {
        userName: localStorage.getItem("ms_username")
      }
      getAdminInfo(resData).then(item => {
        console.log(item)
        this.headImg = item.info[0].admin_logo_url;
      })
    },
    methods: { 
      //抽屉的
      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {});
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
      },
      //放大/缩小
      changeScale(num) { 
        console.log('changeScale')
        num = num || 1; 
        this.$refs.cropper.changeScale(num); 
      }, 
      //坐旋转
      rotateLeft() { 
        console.log('rotateLeft')
        this.$refs.cropper.rotateLeft(); 
      }, 
      //右旋转
      rotateRight() { 
        console.log('rotateRight')
        this.$refs.cropper.rotateRight(); 
      }, 
      //上传图片（点击上传按钮）
      finish(type) { 
        console.log('finish')
        let _this = this;
        let formData = new FormData();
        // 输出 
        if (type === 'blob') { 
          this.$refs.cropper.getCropBlob((data) => { 
            let img = window.URL.createObjectURL(data) 
            this.model = true; 
            this.modelSrc = img; 
            formData.append("file", data, this.fileName);

            //文件发送
            this.$http.post('http://127.0.0.1:7001/file/upload', formData, {contentType: false, processData: false, headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .then((response) => {
              var res = response.data;
              if(res.status == 'success'){
                _this.imgFile = '';
                _this.headImg = 'http://127.0.0.1:7001'+'/app/public/uploadfile/'+res.data.filename;  //完整路径
                _this.uploadImgRelaPath = 'http://127.0.0.1:7001'+'/app/public/uploadfile/'+res.data.filename;  //非完整路径

                let resData = {
                  userName: localStorage.getItem("ms_username"),
                  imgurl: 'http://127.0.0.1:7001'+'/app/public/uploadfile/'+res.data.filename
                }
                updateAdminInfo(resData).then( item => {
                  if(item.status == 'success') {
                    _this.$message({
                      type: 'success',
                      message: '上传成功'
                    });
                  }else {
                    _this.$message({
                      type: 'error',
                      message: '上传失败'
                    });  
                  }
                })
              }
            })
          }) 
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.model = true;
            this.modelSrc = data;
            console.log(data,'else')
          }) 
        }
      }, 
      // 实时预览函数 
      realTime(data) { 
        console.log('realTime')
        this.previews = data 
      }, 
      //下载图片
      down(type) { 
        console.log('down')
        var aLink = document.createElement('a') 
        aLink.download = 'author-img' 
        if (type === 'blob') { 
          this.$refs.cropper.getCropBlob((data) => { 
            this.downImg = window.URL.createObjectURL(data)
            aLink.href = window.URL.createObjectURL(data) 
            aLink.click() 
          }) 
        } else { 
          this.$refs.cropper.getCropData((data) => { 
            this.downImg = data;
            aLink.href = data; 
            aLink.click() 
          }) 
        } 
      }, 
      //选择本地图片
      uploadImg(e, num) { 
        console.log('uploadImg');
        var _this = this;
        //上传图片 
        var file = e.target.files[0] 
        _this.fileName = file.name;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) { 
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') 
          return false 
        } 
        var reader = new FileReader(); 
        reader.onload =(e) => { 
          let data; 
          if (typeof e.target.result === 'object') { 
            // 把Array Buffer转化为blob 如果是base64不需要 
            data = window.URL.createObjectURL(new Blob([e.target.result])) 
          } 
          else { 
            data = e.target.result 
          }
          if (num === 1) { 
            _this.option.img = data 
          } else if (num === 2) { 
            _this.example2.img = data 
          } 
        } 
        // 转化为base64 
        reader.readAsDataURL(file) 
        // 转化为blob 
        // reader.readAsArrayBuffer(file);   
      }, 
      imgLoad (msg) { 
        console.log('imgLoad')
        console.log(msg) 
      }
    },   
  }
</script>
<style lang="scss">
  .info {
    width: 720px;
    margin: 0 auto;
    .oper-dv {
      height:20px;
      text-align:right;
      margin-right:100px;
      a {
        font-weight: 500;
        &:last-child {
          margin-left: 30px;
        }
      }
    }
    .info-item {
      margin-top: 15px;
      label {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .sel-img-dv {
        position: relative;
        .sel-file {
          position: absolute;
          width: 90px;
          height: 30px;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
        .sel-btn {
          position: absolute;
          cursor: pointer;
          z-index: 1;
        }
      }
    }
  }

  .cropper-content{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    .cropper{
      width: 260px;
      height: 260px;
    }
    .show-preview{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      .preview{
        overflow: hidden;
        border-radius: 50%;
        border:1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
      }
    }
  }
  .cropper-content .show-preview .preview {margin-left: 0;}
  .el-input {
    width: auto;
    margin-left: 2px;
  }
  .box-card {
    margin-top: 20px;
  }
  .demo-drawer__footer {
    text-align: center;
    .el-button--default{
      width: 46%;
    }
    .el-button--primary{
      width: 46%;
    }
  }
</style>
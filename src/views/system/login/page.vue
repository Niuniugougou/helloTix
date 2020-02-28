<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号">
            <el-button slot="prepend" icon="el-icon-lx-people" :disabled="true"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock" :disabled="true"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips : 请填写用户名和密码。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { mapActions } from 'vuex'
import { GetMenus } from '@/api/allactions'
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      menuAsidesAll:[],
    }
  },

  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    renrenMenuToD2AdminMenu (menuArray,routeNameDict) {
      const transform = menu => ({
        ...menu.children.length > 0 ? { children: menu.children.map(e => transform(e)) } : {},
        id: menu.id,
        icon: menu.icon,
        title: menu.name,
        name: menu.name,
        path: menu.url
      })
      // console.log(menuArray.map(e => transform(e)))
      this.menuAsidesAll = menuArray.map(e => transform(e))
      return menuArray.map(e => transform(e))
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submitForm (formName) {
      // Encrypt 加密
      var key = "communication123";
      var sKey = CryptoJS.enc.Utf8.parse(key);
      var sContent = CryptoJS.enc.Utf8.parse(this.ruleForm.password);
      var encrypted = CryptoJS.AES.encrypt(sContent, sKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();

      this.$refs[formName].validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          var username = this.ruleForm.username;
          this.login({
            loginName: username,
            password: encrypted
          })
            .then(() => {
              GetMenus().then((res) =>{
                this.renrenMenuToD2AdminMenu(res.children)
                // console.log(localStorage.getItem('curttenDepartId'))
                this.$store.commit('d2admin/menu/asideSet', this.menuAsidesAll)
                // 初始化菜单搜索功能
                this.$store.commit('d2admin/search/init', this.menuAsidesAll)
              }),function(err) {
                this.$message.error(err.message)
              }

              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="css">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>

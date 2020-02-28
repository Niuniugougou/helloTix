<template>
  <div class="forward">
    <el-row :gutter="10">
      <el-form ref="role" :model="role" label-width="80px" :rules="rules">
        <el-form-item label="信件编号">
          <el-input v-model="role.id"></el-input>
        </el-form-item>
        <el-form-item label="信件标题" prop="title">
          <el-input v-model="role.title"></el-input>
        </el-form-item>
        <el-form-item label="提交人" prop="people">
          <el-input v-model="role.people"></el-input>
        </el-form-item>
        <el-form-item label="选择转发信箱" prop="mail">
          <el-input v-model="role.mail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('role')">确 定</el-button>
          <el-button @click="returnBack">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: {
        id: "",
        title: "",
        people: "",
        mail: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        people: [{ required: true, message: "请输入提交人", trigger: "blur" }],
        mail: [{ required: true, message: "请输入转发信箱", trigger: "blur" }]
      }
    };
  },
  methods: {
    returnBack() {
      window.location.reload(false);
    }
  }
};
</script>
<style scoped>
</style>


<template>
  <div class="newDiolog">
    <el-button @click="newLetter">新建</el-button>
    <el-dialog title="新建信件" width="600px" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false">
      <div style="margin-top: -25px; margin-bottom: -25px;">
        <el-form ref="role" :model="role" label-width="120px" :rules="rules">
          <el-form-item label="来信人" prop="fromName">
            <el-input v-model="role.fromName"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="role.email"></el-input>
          </el-form-item>

          <el-form-item label="来信目的" prop="objectiveType">
            <!-- <el-input v-model="role.objectiveType"></el-input> -->
            <el-select v-model="role.objectiveType" class="handle-select mr10">
              <el-option v-for="item in purposeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="role.phone"></el-input>
          </el-form-item>

          <el-form-item label="固定电话" prop="fixedPhone">
            <el-input v-model="role.fixedPhone"></el-input>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="role.address"></el-input>
          </el-form-item>

          <el-form-item label="邮编" prop="postcode">
            <el-input v-model="role.postcode"></el-input>
          </el-form-item>

          <el-form-item label="标题" prop="title">
            <el-input v-model="role.title"></el-input>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <el-input   type="textarea" :rows="3" v-model="role.content"></el-input>
          </el-form-item>

          <el-form-item label="是否公开" prop="isPublic">
            <!-- <el-input v-model="role.isPublic"></el-input> -->
            <el-select v-model="role.isPublic" class="handle-select mr10">
              <el-option key="1" label="公开" value="1"></el-option>
              <el-option key="2" label="不公开" value="0"></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="信件状态" prop="status">
            <el-input v-model="role.status"></el-input>
          </el-form-item>-->

          <el-form-item label="选择部门" prop="deptId">
            <!-- <el-input v-model="role.deptId"></el-input> -->
            <el-cascader
              :options="sponsor"
              change-on-select
              :show-all-levels="false"
              v-model="role.deptId"
              placeholder="选择部门"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="来信人身份证" prop="fromIdCard">
            <el-input v-model="role.fromIdCard"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitFormAdd('role')" :disabled="disabledDoubleClick">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {validateIdNo,validatePhone,validateEMail2,validateMail} from './validate.js'
import { GetDeptTree,GetLetterSelectType,GetSelectContentListData } from '@/api/allactions'
import { letterService } from '@/api/allactions'
export default {
  name: "btndilog",
  data() {
    return {
      //解决双击多次提交
      disabledDoubleClick: false,
      purposeList:[],
      dialogVisible: false,
      role: {
        fromName: "",
        email: "",
        objectiveType: "",
        phone: "",
        fixedPhone: "",
        address: "",
        postcode: "",
        title: "",
        content: "",
        isPublic: "1",
        status: "0",
        deptId: [],
        fromIdCard: ""
      },
      //主办部门
      sponsor: [],
      rules: {
        fromName: [
          { required: true, message: "请输入来信人", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" },{validator:validateEMail2,trigger:"blur"}],
        objectiveType: [
          { required: true, message: "请输入来信目的", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入来信人手机号", trigger: "blur" },{validator:validatePhone,trigger:"blur"}
        ],
        // fixedPhone: [{ required: true, message: "请输入来信人固定电话", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        postcode: [{ required: true, message: "请输入邮编", trigger: "blur" },{validator:validateMail,trigger:"blur"}],
        title: [{ required: true, message: "请输入来信题目", trigger: "blur" }],
        content: [
          { required: true, message: "请输入来信内容", trigger: "blur" }
        ],
        isPublic: [{ required: true, message: "必填选项", trigger: "blur" }],
        status: [{ required: true, message: "选择状态", trigger: "blur" }],
        deptId: [
          { required: true, message: "请输入来信部门id", trigger: "blur" }
        ],
        fromIdCard: [
          { required: true, message: "请输入来信人身份证号", trigger: "blur" },{validator:validateIdNo,trigger:"blur"}
        ]
      }
    };
  },
  mounted: function(){
    //来信目的
    this.getLetterPurpos();
    this.getSponsor();
  },
  methods: {
    //新建
    newLetter() {
      var _this = this;
      _this.dialogVisible = true;

      _this.role = Object.assign({}, _this.role, {
        fromName: "",
        email: "",
        objectiveType: "",
        phone: "",
        fixedPhone: "",
        address: "",
        postcode: "",
        title: "",
        content: "",
        isPublic: "1",
        status: "0",
        deptId: [],
        fromIdCard: ""
      });
    },
    //主办部门树
    getSponsor() {
      var _this = this;
      GetDeptTree().then((res) => {
        if (res.status === "success") {
          _this.sponsor = res.data;
        } else {
          _this.$message.error(res.data.errorMsg);
        }       
      })
    },
    //来信目的
    getLetterPurpos() {
      var _this = this;
      let resData = {
        pageNum: 1,
        pageSize: 30,
        sortMap: {},
        params: {
          isDel: 0,
          value: "mail_type_destination"
        },
        isSend: false
      };
      letterService.letterPurpos(resData).then((res) => {
        if (res.status == "success") {
          _this.purposeList = res.data.rows;
        } else {
          _this.$message.error("请求列表失败。");
        }
      })
    },
    //新建信件
    submitFormAdd(role) {
      var _this = this;
      _this.$refs[role].validate(valid => {
        if (valid) {
          _this.disabledDoubleClick = true;
          if(_this.role.deptId.length>1){
            var alen = _this.role.deptId.length-1;
            var arr = [];
            arr = _this.role.deptId[alen];
          }else{
            var arr = _this.role.deptId[0];
          }

          let resData = {
            fromName: _this.role.fromName,
            email: _this.role.email,
            objectiveType: _this.role.objectiveType,
            phone: _this.role.phone,
            fixedPhone: _this.role.fixedPhone,
            address: _this.role.address,
            postcode: _this.role.postcode,
            title: _this.role.title,
            content: _this.role.content,
            isPublic: _this.role.isPublic,
            status: "0",
            deptId: arr,
            fromIdCard: _this.role.fromIdCard
          };

          letterService.addNewLetter(resData).then((res) => {
            _this.disabledDoubleClick = false;
            if (res.status === "success") {
              _this.dialogVisible = false;
              _this.$emit('getData')
              _this.$message.success("新建成功。");
            } else {
              _this.$message.error(res.data.errorMsg);
              _this.dialogVisible = false;
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.newDiolog {
  display: inline;
}
</style>

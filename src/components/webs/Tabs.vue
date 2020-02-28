<template>
  <d2-container>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> 推送消息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.message_content}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="who_sendmessage" width="150"></el-table-column>
            <el-table-column prop="send_time" width="180"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary" size="small" @click="changeAllToRead()">全部标为已读</el-button>
          </div>
          <div class="handle-row">
            <el-button type="primary" size="small" @click="addSystemMessage()">新增推送消息</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.message_content}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="send_time" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger" size="small" @click="delAllMes">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.message_content}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="send_time" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="handleRestore(scope.$index)" size="small">还原</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger" size="small" @click="clearAllMes">清空回收站</el-button>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--dialog 新增消息-->
    <el-dialog title="新增推送消息" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="消息内容">
          <el-input type="textarea" v-model="form.message_content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitMessage('form')">确 定</el-button>
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--dialog 新增消息-->
  </d2-container>
</template>

<script>
import { tabs } from "@/api/allactions";
export default {
  name: "tabs",
  data() {
    return {
      message: "first",
      showHeader: false,
      form: {
        ID: "",
        message_content: "",
        creattime: ""
      },
      unread: [],
      read: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        }
      ],
      recycle: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        }
      ],
      dialogFormVisible: false
    };
  },
  methods: {
    //全部已读
    delAllMes() {
      tabs
        .delAllMes()
        .then((res) => {
          this.$message.success(res.message);
          this.getMessageNotRead();
          this.getMessageAlreadyRead();
          this.getMessageIsdel();
        })
    },
    //标记某一条已读
    handleRead(index) {
      const item = this.unread.splice(index, 1);
      console.log(item);
      this.read = item.concat(this.read);
      var _this = this;
      let resData = {
        ID: item[0].ID
      };
      console.log(resData);
      tabs
        .readTheMessage(resData)
        .then(res => {
          console.log("nihao");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除某一条
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
      var _this = this;
      let resData = {
        ID: item[0].ID
      };
      tabs
        .delTheMessage(resData)
        .then(res => {
          _this.read = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
      var _this = this;
      let resData = {
        ID: item[0].ID
      };
      tabs
        .returnTheMessage(resData)
        .then(res => {
          console.log("nihao2");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新增
    addSystemMessage() {
      var _this = this;
      _this.dialogFormVisible = true;
      _this.form.message_content = "";
    },
    //新增提交
    submitMessage(form) {
      var _this = this;
      var currentdate = new Date().toLocaleString();
      let resData = {
        username: localStorage.getItem("ms_username"),
        creattime: currentdate,
        message: _this.form.message_content
      };
      tabs
        .creatNewMessage(resData)
        .then(res => {
          _this.$message.success(res.message);
          _this.dialogFormVisible = false;
          _this.getMessageNotRead();
          _this.getMessageAlreadyRead();
          _this.getMessageIsdel();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到未读列表
    getMessageNotRead() {
      var _this = this;
      tabs
        .getMessageNotRead()
        .then(res => {
          _this.unread = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到已读列表
    getMessageAlreadyRead() {
      var _this = this;
      tabs
        .getMessageAlreadyRead()
        .then(res => {
          _this.read = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到删除列表
    getMessageIsdel() {
      var _this = this;
      tabs
        .getMessageIsdel()
        .then(res => {
          _this.recycle = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //把全部信息标记为已读
    changeAllToRead() {
      tabs.readAllTheMessage().then((res) => {
        this.$message.success(res.message);
        this.getMessageNotRead();
        this.getMessageAlreadyRead();
        this.getMessageIsdel();
      }).catch(err => {
        console.log(err);
      })
    },
    //清空回收站
    clearAllMes() {
      tabs.clearAllMessage().then((res) => {
        this.$message.success(res.message);
        this.getMessageNotRead();
        this.getMessageAlreadyRead();
        this.getMessageIsdel();
      }).catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function() {
      _this.getMessageNotRead();
      _this.getMessageAlreadyRead();
      _this.getMessageIsdel();
    });
  }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>


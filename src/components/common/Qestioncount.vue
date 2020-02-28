<template>
  <div class="table">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center; margin-bottom:16px;">
          <h2>{{role.title}}</h2>
        </el-col>
        <el-row :gutter="20">
          <el-col :span="4">问卷说明：</el-col>
          <el-col :span="18">
            <!-- <h3>{{role.explain2}}</h3> -->
            <quill-editor ref="myTextEditor3" v-model="role.explain2" :options="editorOption"></quill-editor>
          </el-col>
        </el-row>
        <el-col :span="4" style="margin-top:16px;">寄语：</el-col>
        <el-col :span="18" style="margin-top:16px;">
          <h3>{{role.message}}</h3>
        </el-col>
        <el-col :span="4" style="margin-top:16px;">日期：</el-col>
        <el-col :span="18" style="margin-top:16px;">
          <h3>{{role.datetime}}</h3>
        </el-col>
      </el-row>

      <!-- //分页 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
    </div>
    <el-row
      :gutter="20"
      v-for="(item, index) in problemsList"
      class="list-row"
      :key="index"
      style="margin: 6px auto; width: 96%;border: 1px solid #ddd;padding-bottom: 10px;"
    >
      <el-col :span="24" class="tittle">
        <span
          style="margin-top: 16px;display: inline-block;font-size:16px;font-weight: bold;"
        >{{item[0].title}}({{item[0].type.trim()=='RADIO'? '单选': item[0].type.trim()=='CHECK'? '多选': item[0].type.trim()=='RADIO_BLANK'? '单选带回答' : item[0].type.trim()=='CHECK_BLANK'? '多选带回答': item[0].type.trim()=='RADIO_PIC'? '单选带图片': item[0].type.trim()=='TEXT'? '文本类型': item[0].type.trim()=='RADIO_SCORE'?'评分题':'多选带图片'}})</span>
      </el-col>
      <el-col :span="24">
        <el-row v-if="item[0].type.trim()== 'RADIO'">
          <el-col :span="16">
            <template>
              <el-radio-group>
                <el-radio
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.id"
                  :label="item2.content"
                >{{item2.content}}（{{item2.count}}次）</el-radio>
              </el-radio-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
            <!-- <el-button @click="delOneQuestion(item[0].itemId)" type="danger" icon="el-icon-delete" circle size="small"></el-button>
                <el-button @click="editOneQuestion(item[0].itemId,item[0].type.trim())" type="primary" size="small" icon="el-icon-edit" circle></el-button>
            <el-button @click="yesOrNo(item[0].itemId)" type="" size="small">{{item[0].isOpen== '0'? '禁用': '启用'}}</el-button>-->
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()== 'RADIO_SCORE'">
          <el-col :span="16">
            <template>
              <el-radio-group>
                <el-radio
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.id"
                  :label="item2.content"
                >{{item2.content}}（{{item2.count}}次）</el-radio>
              </el-radio-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()=='CHECK'">
          <el-col :span="16">
            <template>
              <el-checkbox-group>
                <el-checkbox
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.id"
                  :label="item2.content"
                >{{item2.content}}（{{item2.count}}次）</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()=='RADIO_BLANK'">
          <el-col :span="16">
            <template>
              <el-radio-group>
                <el-radio
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.selId"
                  :label="item2.content"
                >
                  {{item2.content}}
                  <el-button type="text" size="mini" @click="statistical(item2.selId)">回复统计</el-button>
                </el-radio>
              </el-radio-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()=='RADIO_PIC'">
          <el-col :span="16">
            <template>
              <el-radio-group>
                <el-radio
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.selId"
                  :label="item2.content"
                >
                  <!-- {{item2.content}} -->
                  <img :src="item2.content" alt class="imgtooLarge">
                  <!-- <el-button type="text" size="mini" @click="statistical(item2.selId)">回复统计</el-button> -->
                </el-radio>
              </el-radio-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()=='CHECK_PIC'">
          <el-col :span="16">
            <template>
              <el-checkbox-group>
                <el-checkbox
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.id"
                  :label="item2.content"
                >
                  <!-- {{item2.content}} -->
                  <img :src="item2.content" alt class="imgtooLarge">
                  <!-- <el-button type="text" size="mini" @click="statistical(item2.selId)">回复统计</el-button> -->
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()=='CHECK_BLANK'">
          <el-col :span="16">
            <template>
              <el-checkbox-group>
                <el-checkbox
                  style="width: 100%;margin-top: 16px;"
                  v-for="item2 in item"
                  :key="item2.id"
                  :label="item2.content"
                >
                  {{item2.content}}
                  <el-button type="text" size="mini" @click="statistical(item2.selId)">回复统计</el-button>
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-col>
          <el-col :span="8">
            <schart
              class="schart"
              :canvasId="getId(index)"
              :data="item[0].data"
              type="bar"
              :options="options"
            ></schart>
          </el-col>
        </el-row>

        <el-row v-if="item[0].type.trim()=='TEXT'">
          <el-col :span="16">
            <template>
              <!-- {{item[0].selId}} -->
              <span style="color: #fff;">.</span>
              <el-button type="text" size="mini" @click="statistical(item[0].selId)">回复统计</el-button>
            </template>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- //网友留言弹窗 -->
    <el-dialog title="网友留言" :visible.sync="commentVisible" width="60%" append-to-body>
      

      <!-- 删除留言 -->
      <el-dialog title="删除留言" :visible.sync="delCommentVisible" width="300px" append-to-body>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delCommentVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteComment()">确 定</el-button>
        </span>
      </el-dialog>
<!-- 
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="2">
            <div class="comTitle">姓名：</div>
          </el-col>
          <el-col :span="4">
            <el-input v-model="searchForm.nickName" placeholder="请输入姓名"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="comTitle">邮箱：</div>
          </el-col>
          <el-col :span="4">
            <el-input v-model="searchForm.email" placeholder="请输入邮箱"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="comTitle">电话：</div>
          </el-col>
          <el-col :span="4">
            <el-input v-model="searchForm.phone" placeholder="请输入电话"></el-input>
          </el-col>
          <el-col :span="4" class="sosuo">
            <el-button type="primary" size="small" @click="searchComment">搜索</el-button>
          </el-col>
        </el-row>
      </el-form> -->
      <el-table :data="commentData" border style="width: 100%" class="comtab">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="content" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="publicAnswer(scope.row.id)">{{scope.row.isAudit == 0? "公开":"未公开"}}</el-button>
            <el-button type="primary" size="small" @click="btnCommentDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="commentVisible = false">返回</el-button>
      </div>
      <!-- //分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commenttotal"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { questionPaper } from '@/api/allactions'
import Schart from "vue-schart";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "questioncount",
  components: {
    Schart,
    quillEditor
  },
  props: { tjId: String },
  data() {
    return {
      editorOption: {
        placeholder: "无。",
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      },
      delCommentVisible: false,
      commentVisible: false,
      innerVisible: false,
      commentForm: {
        title: "",
        nickName: "",
        createTime: "",
        email: "",
        phone: "",
        content: ""
      },
      commentData: [],
      delID: "",
      //留言分页总条数初始值
      commenttotal: 5,

      options: {
        padding: 10, // canvas 内边距
        bgColor: "#FFFFFF", // 默认背景颜色
        title: "所选比例", // 图表标题
        titleColor: "#000000", // 图表标题颜色
        titlePosition: "bottom", // 图表标题位置: top / bottom
        legendColor: "#000000", // 图例文本颜色
        legendTop: 0, // 图例距离顶部的长度
        colorList: ["#1E9FFF", "#13CE66", "#F7BA2A", "#FF4949", "#72f6ff"], // 环形图颜色列表
        radius: 40, // 环形图外圆半径
        innerRadius: 0 // 环形图内圆半径
      },

      //编辑题目的select
      isSelectDis: false,

      //题目列表
      problemsList: [],
      onlyId: "",

      isMustUse: "0",
      isMustAnswer: "0",
      //最少输入字
      lastNumWord: "0",
      //最多输入字数
      mostNumWord: "0",
      lastNum: "0",
      mostNum: "0",

      //题目类型
      questType: "",
      //新增题目的排序
      inputAddQuestNum: "",
      //新增题目input
      inputAddQuest: "",
      //搜索内容

      innerVisibleEdit: false,

      // 分页
      currentPage: 1, //初始页
      pagesize: 10, //每页的数据
      total: 5,

      statisticalVisile: false,
      isAddState: "",

      problemId: "",
      role: {
        title: "",
        explain: "",
        explain2: "",
        id: "",
        message: "",
        sequence: "",
        datetime: "",
        isPublish: "0",
        isSurvey: "0"
      },
      quesId: ""
    };
  },
  watch: {
    tjId: {
      handler: function(val, oldval) {
        if (val != oldval) {
          this.$nextTick(() => {
            this.getTheProblemList();
            this.getInfo();
          });
        }
      },
      immediate: true, //关键
      deep: true
    }
  },
  mounted: function() {
    this.getTheProblemList();
    this.getInfo();
  },

  methods: {
    //删除
    btnCommentDel(id) {
      var _this = this;
      _this
        .$confirm("此操作将删除该题目, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          let resData = {
            id: id
          };
          questionPaper.delAnswer(resData).then((res) => {
            if (res.status === "success") {
              _this.$message({
                type: "success",
                message: "删除成功! "
              });
              _this.getListAnswer(_this.quesId);

            } else {
              _this.$message.error(res.data.errorMsg);
            }
          })
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消公开"
          });
        });
    },
    //公开
    publicAnswer(id){
      var _this = this;
      _this
        .$confirm("请确认是否继续此操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          let resData = {
            id: id
          };
          questionPaper.publicAnwer(resData).then((res) => {
              if (res.status === "success") {
                _this.$message({
                  type: "success",
                  message: "公开成功! "
                });
                _this.getListAnswer(_this.quesId);

              } else {
                _this.$message.error(res.data.errorMsg);
              }
          })
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消公开"
          });
        });
    },
    deleteComment() {},
    //回复列表
    getListAnswer(id) {
      var _this = this;
      var resData = {
        pageNum: _this.currentPage,
        pageSize: _this.pagesize,
        sortMap: {},
        params: {
          selId: id
        }
      };
      questionPaper.answerDetails(resData).then((res) => {
          if (res.status === "success") {
            _this.commenttotal = res.data.total;
            _this.commentData = res.data.rows;
          } else {
            _this.$message.error(res.data.errorMsg);
          }
      })
    },
    //回复统计
    statistical(data) {
      this.quesId = data;
      this.commentVisible = true;
      this.getListAnswer(data);
    },
    //动态id
    getId(id) {
      return "chart_" + id;
    },
    //题目属性
    getInfo() {
      var _this = this;
      var resData = {
        id: _this.tjId
      };
      questionPaper.getDetailOfQuestionPaper(resData).then((res) => {
          if (res.status === "success") {
            var dataD = res.data;
            var startTime = dataD.startTime.split("T")[0];
            var endTime = dataD.endTime.split("T")[0];
            var time = [];
            time.push(startTime);
            time.push(endTime);
            _this.role = Object.assign({}, _this.role, {
              title: dataD.title,
              explain2: dataD.explain,
              id: dataD.id,
              message: dataD.message,
              sequence: dataD.sequence,
              datetime: time
            });
          } else {
            _this.$message.error(res.data.errorMsg);
          }
      })
    },

    //硬删问题
    delOneQuestion(id) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          let resData = {
            itemId: id
          };
          questionPaper.questionDelReById(resData).then((res) => {
              if (res.status === "success") {
                _this.$message({
                  type: "success",
                  message: "删除成功! "
                });
                _this.getTheProblemList();
              } else {
                _this.$message.error(res.data.errorMsg);
              }
          })
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获得题目列表
    getTheProblemList() {
      var _this = this;
      var resData2 = {
        id: _this.tjId
      };
      questionPaper.statisticalDetails(resData2).then((res) => {
          if (res.status === "success") {
            _this.problemsList = res.data;
            var arrlist = [];
            arrlist = res.data;
            for (var i = 0; i < res.data.length; i++) {
              arrlist[i][0].data = [];
              for (var j = 0; j < arrlist[i].length; j++) {
                arrlist[i][0].data.push({
                  name: j + 1,
                  value: arrlist[i][j].count
                });
              }
            }
          } else {
            _this.$message.error(res.data.errorMsg);
          }
      })
    },
    //编辑某个问题
    editOneQuestion(id) {
      var _this = this;
      _this.problemId = id;
      _this.isAddState = "edit";
      _this.innerVisibleEdit = true;
      _this.isSelectDis = true;
      _this.inputAddQuest = "";
      _this.questType = "";
      _this.isMustAnswer = "0";
      _this.isMustUse = "0";
      _this.lastNum = "";
      _this.mostNum = "";
      _this.lastNumWord = "";
      _this.mostNumWord = "";
      _this.inputAddQuestNum = "";
      _this.todolist = [];

      var resData = {
        itemId: id
      };
      questionPaper.getOneQuesDetail(resData).then((res) => {
          if (res.status === "success") {
            _this.inputAddQuest = res.data[0].title;
            _this.questType = res.data[0].type.trim();
            _this.isMustAnswer = `${res.data[0].isNecessary}`;
            _this.isMustUse = `${res.data[0].isOpen}`;
            _this.lastNum = res.data[0].checkMin;
            _this.mostNum = res.data[0].checkMax;
            _this.lastNumWord = res.data[0].textSizeMIn;
            _this.mostNumWord = res.data[0].textSizeMax;
            _this.inputAddQuestNum = res.data[0].sequence;

            if (res.data[0].type.trim() != "TEXT") {
              for (var i = 0; i < res.data.length; i++) {
                var con = {
                  content: res.data[i].content,
                  id: res.data[i].id
                };
                _this.todolist.push(con);
              }
            } else {
              _this.todolist = undefined;
            }

            _this.selectType(res.data[0].type.trim());
          } else {
            _this.$message.error(res.data.errorMsg);
          }
      })
    },

    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      // this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getData();
    }
  }
};
</script>

<style scoped>
.schart {
  width: 15rem;
  height: 12rem;
}
.imgtooLarge {
  width: 50px;
  height: 50px;
  margin-left: 20px;
}
</style>
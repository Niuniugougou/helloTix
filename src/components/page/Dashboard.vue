<template>
  <d2-container>
    <el-row :gutter="20" class="main">
      <el-col :span="14">
        <h4>受理统计</h4>
        <div class="schart-box">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
      </el-col>
      <el-col :span="8">
        <h4>分类统计</h4>
        <div class="schart-box">
          <ve-histogram :data="histogramChartData"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="main_top"></el-row>
    <div>
      <chartLine></chartLine>
    </div>
    <div>
      <chartScatter></chartScatter>
    </div>
    <div>
      <chartPie></chartPie>
    </div>
  </d2-container>
</template>

<script>
import chartLine from "@/components/v-chart/chartsLine.vue"
import chartScatter from "@/components/v-chart/chartScatter.vue"
import chartPie from "@/components/v-chart/chartPie.vue"
import { dashboard } from "@/api/allactions";
export default {
  name: "dashboard",
  components: {
    chartLine,
    chartScatter,
    chartPie
  },
  data() {
    this.chartSettings = {
      xAxisType: "time",
      area: true
    };
    return {
      chartData: {
        columns: ["日期", "受理总数", "已处理", "未处理"],
        rows: [
          { "日期": "2018-01-01", "受理总数": 1393, "已处理": 1093, "未处理": 97 },
          { "日期": "2018-01-02", "受理总数": 3530, "已处理": 3230, "未处理": 120 },
          { "日期": "2018-01-03", "受理总数": 2923, "已处理": 2623, "未处理": 110 },
        ]
      },
      histogramChartData: {
        columns: ["分类", "百分比"],
        rows: [
          { 分类: "投诉", 百分比: 27 },
          { 分类: "监察", 百分比: 9 },
          { 分类: "求助", 百分比: 5 },
          { 分类: "咨询", 百分比: 50 },
          { 分类: "表扬", 百分比: 5 },
          { 分类: "举报", 百分比: 2 },
          { 分类: "建议", 百分比: 2 }
        ]
      },
      letterdepartment: 0,
      letterhandover: 0, 
      wbNumber: 0,
      marqueeList: []
    };
  },
  mounted: function() {

  },
  computed: {
    haveLetterNum: function() {
      return this.marqueeList.length > 0 ? false : true;
    }
  },
  methods: {  }
};
</script>
<style scoped>
.main {
  margin: 10px auto 0;
  text-align: center;
}
.main h4 {
  text-align: left;
  margin-left: 25px;
}
.main .item {
  margin-top: 20px;
}
.main .item button {
  height: 150px;
  width: 150px;
  margin-bottom: 20px;
  font-size: 18px;
  border-radius: 15px;
}
.schart {
  height: 400px;
}
.main_top {
  margin-top: 15px;
}
.marquee_box {
  height: 360px;
  overflow: hidden;
}
.marquee_box h4 {
  margin-bottom: 15px;
}
.marquee_list li {
  list-style-type: none;
  text-align: left;
}
.marquee_list li a {
  font-size: 16px;
  line-height: 37px;
  color: #000000;
}
.marquee_list li a span {
  margin-right: 10px;
}
@media screen and (max-width: 1200px) {
  .main .item button {
    height: auto;
    width: auto;
    padding: 30px;
    margin-bottom: 20px;
    font-size: 18px;
    border-radius: 15px;
  }
  .schart {
    width: 440px;
    height: 400px;
  }
}
</style>

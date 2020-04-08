<template>
  <div style="width:98%;">
    <ve-line 
    :data="chartData" 
    :data-zoom="dataZoom" 
    :toolbox="toolbox"
    :mark-line="markLine"
    :mark-point="markPoint"></ve-line>
  </div>
</template>
<script>
export default {
  name: "chartLine",
  data() {
    this.dataZoom = [
      {
        type: "slider",
        start: 0,
        end: 100
      }
    ];
    this.toolbox = {
      feature: {
        magicType: {type: ['line', 'bar']},
        saveAsImage: {}
      }
    }
    this.markLine = {
      data: [
        {
          name: '平均线',
          type: 'average'
        }
      ]
    }
    this.markPoint = {
      data: [
        {
          name: '最大值',
          type: 'max'
        }
      ]
    }
    return {
      chartData: {
        columns: ['日期', '总领料', '总用料','总余量'],
        rows: [
          { '日期': '1月1日', '总领料': 15, '总用料': 12,'总余量': 3 },
          { '日期': '1月2日', '总领料': 12, '总用料': 25,'总余量': -13 },
          { '日期': '1月3日', '总领料': 21, '总用料': 10,'总余量': 11 },
          { '日期': '1月4日', '总领料': 41, '总用料': 32,'总余量': 9 },
          { '日期': '1月5日', '总领料': 31, '总用料': 30,'总余量': 1 },
          { '日期': '1月6日', '总领料': 71, '总用料': 55,'总余量': 16 }
        ]
      }
    };
  }
};
</script>

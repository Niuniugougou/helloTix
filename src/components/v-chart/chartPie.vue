<template>
  <div style="width:98%;">
    <ve-pie 
    :data="chartData" 
    :settings="chartSettings"
    :toolbox="toolbox"></ve-pie>
  </div>
</template>
<script>
export default {
  name: "chartPie",
  data() {
    this.toolbox = {
      feature: {
        saveAsImage: {}
      }
    }
    this.chartSettings = {
      roseType: 'radius'
    }
    return {
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1月1日', '访问用户': 2000 },
          { '日期': '1月2日', '访问用户': 2000 },
          { '日期': '1月3日', '访问用户': 3000 },
          { '日期': '1月4日', '访问用户': 4000 },
          { '日期': '1月5日', '访问用户': 5000 },
          { '日期': '1月6日', '访问用户': 6000 }
        ]
      }
    }
  }
};
</script>

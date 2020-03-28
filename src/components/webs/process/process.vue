<template>
  <d2-container>
    <div id="process">
      <wfd-vue
        ref="wfd"
        :data="defaultData"
        :height="645"
        :dataSourceParam="dataSourceParam"
        :subFlowdataSourceParam="subFlowdataSourceParam"
        :lang="lang"
      />
    </div>
    <div>
      插件地址：https://github.com/guozhaolong/wfd
    </div>
  </d2-container>
</template>

<script>
import WfdVue from "@/components/Wfd";
//去抖动方法
let timeout = null;
let debounce = function(fn, wait) {
  if (timeout !== null) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(fn, wait);
};
export default {
  components: {
    WfdVue
  },
  data() {
    return {
      flowId: "", //工作流id
      defaultData: {},
      mainProcess: false,
      productId: [],
      lang: "zh"
    };
  },
  mounted() {},
  computed: {
    dataSourceParam: function() {
      return {
        productId: this.productId[this.productId.length - 1],
        flowId: this.flowId
      };
    },
    subFlowdataSourceParam: function() {
      return {
        productId: this.productId[this.productId.length - 1],
        flowId: this.flowId,
        plannedOutput: this.plannedOutput
      };
    }
  },
  methods: {
    saveProcess() {
      debounce(() => {
        let dft = this.$refs.wfd.graph.save();

      }, 500);
    },

  }
};
</script>

<style scoped>
#process {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 12px;
}
</style>

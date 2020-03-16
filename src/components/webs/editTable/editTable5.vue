<template>
  <div>
    <h3>5.使用插件（基本满足所有业务需求）</h3>
    <vxe-table
      border
      show-overflow
      show-footer
      keep-source
      ref="xTable"
      height="600"
      class="my-xtable-element"
      :loading="loading"
      :data="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
    >
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="80">
        <template v-slot:header>
          <span>序号</span>
          <i class="el-icon-question"></i>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="name"
        title="ElInput"
        min-width="140"
        :edit-render="{type: 'default'}"
      >
        <template v-slot:edit="scope">
          <el-input v-model="scope.row.name" @input="updateData(scope)"></el-input>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="role"
        title="ElAutocomplete"
        min-width="160"
        :edit-render="{type: 'default'}"
      >
        <template v-slot:edit="{ row }">
          <el-autocomplete v-model="row.role" :fetch-suggestions="roleFetchSuggestions"></el-autocomplete>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="age"
        title="ElInputNumber"
        width="160"
        :edit-render="{type: 'default'}"
      >
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <i class="el-icon-warning"></i>
        </template>
        <template v-slot:edit="{ row }">
          <el-input-number v-model="row.age" :max="35" :min="18"></el-input-number>
        </template>
      </vxe-table-column>
      
      <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{type: 'visible'}">
        <template v-slot:edit="scope">
          <el-select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList,row) }}</template>
      </vxe-table-column>

      <vxe-table-column field="sex1" title="ElSelect" width="180" :edit-render="{type: 'visible'}">
        <template v-slot:edit="scope">
          <el-select v-model="scope.row.sex1" multiple>
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
        <template v-slot="{ row }">{{ getSelectMultipleLabel(row.sex1, sexList) }}</template>
      </vxe-table-column>
      
      <vxe-table-column
        field="region"
        title="ElCascader"
        width="200"
        :edit-render="{type: 'visible'}"
      >
        <template v-slot:edit="{ row }">
          <el-cascader v-model="row.region" :options="regionList"></el-cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column
        field="date"
        title="ElDatePicker"
        width="200"
        :edit-render="{type: 'visible'}"
      >
        <template v-slot:edit="{ row }">
          <el-date-picker v-model="row.date" type="date" format="yyyy/MM/dd"></el-date-picker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
      </vxe-table-column>
      <vxe-table-column
        field="date1"
        title="ElDatePicker"
        width="220"
        :edit-render="{type: 'visible'}"
      >
        <template v-slot:edit="{ row }">
          <el-date-picker v-model="row.date1" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date1, 'yyyy-MM-dd HH:mm:ss') }}</template>
      </vxe-table-column>
      <vxe-table-column
        field="date2"
        title="ElTimePicker"
        width="200"
        :edit-render="{type: 'visible'}"
      >
        <template v-slot:edit="{ row }">
          <el-time-select
            v-model="row.date2"
            :picker-options="{start: '08:30', step: '00:15', end: '18:30'}"
          ></el-time-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" width="200" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <el-rate v-model="row.rate"></el-rate>
        </template>
      </vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <el-switch v-model="row.flag"></el-switch>
        </template>
      </vxe-table-column>
    </vxe-table>

        <el-button @click="insertEvent">新增</el-button>
        <el-button @click="saveEvent">保存</el-button>


    <pre>
      <code class="css">{{ demoCodes[0] }}</code>
      <code class="css">插件地址：https://github.com/xuliangzhan/vxe-table</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from "xe-utils";
import hljs from "highlight.js";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      sexList: [],
      regionList: [],
      restaurants: [
        { value: "前端", name: "前端" },
        { value: "后端", name: "后端" }
      ],
      demoCodes: [
        `
        /*注意：如果是自行实现，需要自行处理好兼容样式，否则可能会显示错乱，例如：*/
        /*
        .my-xtable-element .vxe-cell > .el-input,
        .my-xtable-element .vxe-cell > .el-input-number,
        .my-xtable-element .vxe-cell > .el-select,
        .my-xtable-element .vxe-cell > .el-cascader,
        .my-xtable-element .vxe-cell > .el-date-editor {
          width: 100%;
        }
        */
        `
      ]
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.tableData = [
        {
          id: 10000,
          name: "test", 
          role: "前端",
          sex: "0",
          age: 22,
          date: "Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)",
          region: [21],
          address: "vxe-table 从入门到放弃 - 地址0",
          flag: true,
          rate: 2,
          date1: "Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)",
          date2: "09:00:00",
          sex1: ["1"]
        }
      ]; 
      this.loading = false;
    }, 500);
    this.findSexList();
    this.findRegionList();
  },
  mounted() {
    Array.from(this.$el.querySelectorAll("pre code")).forEach(block => {
      hljs.highlightBlock(block);
    });
  },
  methods: {
    insertEvent() {
      const xTable = this.$refs.xTable;
      const record = {
        role: "",
        age: 18,
        sex1: [],
        region: [],
        flag: false,
        rate: 2
      };
      xTable.insert(record).then(({ row }) => xTable.setActiveRow(row));
    },
    saveEvent() {
      console.log(this.$refs.xTable.tableData)
    },
    updateData(scope) {
      this.$refs.xTable.updateStatus(scope.row);
    },
    findSexList() {
      this.sexList = [
        { label: "", value: ""},
        { label: "男", value: "1"},
        { label: "女", value: "0"}
      ];
    },
    findRegionList() {
      this.regionList = [
        {
          value: 1,
          label: "北京",
          children: [
            {
              value: 2,
              label: "北京市",
              children: [
                { label: "东城区", value: 3 },
                { label: "西城区", value: 4 }
              ]
            }
          ]
        },
        { value: 21, label: "上海" }
      ];
    },
    formatDate(value, format) {
      return XEUtils.toDateString(value, format);
    },
    getSelectLabel(value, list, row,valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, item => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    getSelectMultipleLabel(value, list, valueProp = "value", labelField = "label" ) {
      return value
        .map(val => {
          const item = XEUtils.find(list, item => item[valueProp] === val);
          return item ? item[labelField] : null;
        }).join(", ");
    },
    getCascaderLabel(value, list) {
      const values = value || [];
      const labels = [];
      const matchCascaderData = function(index, list) {
        const val = values[index];
        if (list && values.length > index) {
          list.forEach(item => {
            if (item.value === val) {
              labels.push(item.label);
              matchCascaderData(++index, item.children);
            }
          });
        }
      };
      matchCascaderData(0, list);
      return labels.join(" / ");
    },
    roleFetchSuggestions(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "平均";
          }
          if (["age", "rate"].includes(column.property)) {
            return XEUtils.mean(data, column.property);
          }
          return null;
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "和值";
          }
          if (["age", "rate"].includes(column.property)) {
            return XEUtils.sum(data, column.property);
          }
          return null;
        })
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
.my-xtable-element .vxe-cell > .el-input,
.my-xtable-element .vxe-cell > .el-input-number,
.my-xtable-element .vxe-cell > .el-select,
.my-xtable-element .vxe-cell > .el-cascader,
.my-xtable-element .vxe-cell > .el-date-editor {
  width: 100%;
}
</style>
<template>
  <div>
    <vxe-grid
      border
      show-overflow
      ref="xGrid"
      height="460"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row'}"
      :keep-source="true"
    >
      <template v-slot:top>
        <el-alert
          type="warning"
          :title="`已选择 ${selectRecords.length} 项`"
          :closable="false"
          show-icon
        ></el-alert>
      </template>
      <template v-slot:buttons>
        <el-button @click="insertEvent">新增</el-button>
        <el-button @click="saveEvent">保存</el-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      selectRecords: [],
      tableColumn: [
        { type: 'checkbox', width: 60 },
        { type: 'seq', title: 'Number', width: 80 },
        { field: 'name', title: 'ElInput', minWidth: 140, editRender: { name: 'ElInput' } },
        { field: 'role', title: 'ElAutocomplete', width: 160, editRender: { name: 'ElAutocomplete', props: { fetchSuggestions: this.roleFetchSuggestions } } },
        { field: 'age', title: 'ElInputNumber', width: 160, editRender: { name: 'ElInputNumber', props: { max: 35, min: 18 } } },
        { field: 'sex', title: 'ElSelect', width: 140, editRender: { name: 'ElSelect', options: [] } },
        { field: 'sex1', title: 'ElSelect', width: 160, editRender: { name: 'ElSelect', options: [], props: { multiple: true, clearable: true } } },
        { field: 'sex2', title: 'ElSelect', width: 140, editRender: { name: 'ElSelect', optionGroups: [], props: { clearable: true } } },
        { field: 'region', title: 'ElCascader', width: 200, editRender: { name: 'ElCascader', props: { options: [] } } },
        { field: 'date', title: 'ElDatePicker', width: 200, editRender: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy/MM/dd' } } },
        { field: 'date1', title: 'DateTimePicker', width: 220, editRender: { name: 'ElDatePicker', props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss' } } },
        { field: 'date5', title: 'ElTimeSelect', width: 200, editRender: { name: 'ElTimeSelect', props: { pickerOptions: { start: '08:30', step: '00:15', end: '18:30' } } } },
        { field: 'flag', title: 'ElSwitch', width: 100, editRender: { name: 'ElSwitch', type: 'visible' } },
        { field: 'rate', title: 'ElRate', width: 200, editRender: { name: 'ElRate', type: 'visible' } }
      ],
      tableToolbar: {},
      restaurants: [
        { value: "前端", name: "前端" },
        { value: "后端", name: "后端" },
        { value: "开发", name: "开发" },
        { value: "测试", name: "测试" }
      ]
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.tableData = [
        {
          address: "vxe-table 从入门到放弃 - 地址0",
          age: 22,
          checked: true,
          checkedList: [],
          date: "Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)",
          date1: "Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)",
          date2: "09:00:00",
          flag: true,
          loading: false,
          list: [],
          name: "HH0",
          rate: 2,
          region: [1, 2, 3],
          role: "前端",
          sex: "1",
          sex1: ["1"]
        }
      ];
      this.loading = false;
    }, 500);
    this.findSexList();
    this.findRegionList();
    this.findSexGroupList();
  },
  methods: {
    insertEvent() {
      const xGrid = this.$refs.xGrid;
      const record = {
        role: "",
        age: 18,
        sex1: [],
        region: [],
        flag: false,
        rate: 2
      };
      xGrid.insert(record).then(({ row }) => xGrid.setActiveRow(row));
    },
    findSexList() {
      this.tableColumn[5].editRender.options = [
        { label: "", spell: "", value: "", value2: null, val: "" },
        { label: "男", spell: "nan", value: "1", value2: 1, val: "x" },
        { label: "女", spell: "nv", value: "0", value2: 0, val: "o" }
      ];
      this.tableColumn[6].editRender.options = [
        { label: "", spell: "", value: "", value2: null, val: "" },
        { label: "男", spell: "nan", value: "1", value2: 1, val: "x" },
        { label: "女", spell: "nv", value: "0", value2: 0, val: "o" }
      ];
    },
    findRegionList() {
      this.tableColumn[8].editRender.props.options = [
        {
          value: 1,
          label: "北京",
          children: [
            {
              children: [
                {
                  value: 2,
                  label: "北京市",
                  children: [
                    { label: "东城区", value: 3 },
                    { label: "西城区", value: 4 }
                  ]
                }
              ],
              label: "北京",
              value: 1
            }
          ]
        },
        { value: 21, label: "上海", children: [] }
      ];
    },
    findSexGroupList() {
      let sexGroupList = [
        {
          label: "分组1",
          options: [
            {
              label: "男",
              value: "1"
            }
          ]
        },
        {
          label: "分组2",
          options: [
            {
              label: "女",
              value: "0"
            }
          ]
        }
      ];
      this.tableColumn[7].editRender.optionGroups = sexGroupList;
    },
    saveEvent() {
      let {
        insertRecords,
        removeRecords,
        updateRecords
      } = this.$refs.xGrid.getRecordset();
      if (
        insertRecords.length ||
        removeRecords.length ||
        updateRecords.length
      ) {
        this.$alert(
          `insertRecords=${insertRecords.length}; removeRecords=${removeRecords.length}; updateRecords=${updateRecords.length}`
        );
      } else {
        this.$alert("数据未改动！");
      }
    },
    roleFetchSuggestions(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    checkboxChangeEvent() {
      this.selectRecords = this.$refs.xGrid.getCheckboxRecords();
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
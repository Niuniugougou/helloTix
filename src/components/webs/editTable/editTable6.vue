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
      @checkbox-change="checkboxChangeEvent"
      @checkbox-all="checkboxChangeEvent"
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
        { type: "checkbox", width: 60 },
        { type: "seq", title: "Number", width: 80 },
        {
          field: "name",
          title: "ElInput",
          minWidth: 140,
          editRender: { name: "ElInput" }
        },
        {
          field: "role",
          title: "ElAutocomplete",
          width: 160,
          editRender: {
            name: "ElAutocomplete",
            props: { fetchSuggestions: this.roleFetchSuggestions }
          }
        },
        {
          field: "age",
          title: "ElInputNumber",
          width: 160,
          editRender: { name: "ElInputNumber", props: { max: 35, min: 18 } }
        },
        {
          field: "sex",
          title: "ElSelect",
          width: 140,
          editRender: { name: "ElSelect", options: [] }
        },
        {
          field: "sex1",
          title: "ElSelect",
          width: 160,
          editRender: {
            name: "ElSelect",
            options: [],
            props: { multiple: true, clearable: true }
          }
        },
        {
          field: "sex2",
          title: "ElSelect",
          width: 140,
          editRender: {
            name: "ElSelect",
            optionGroups: [],
            props: { clearable: true }
          }
        },
        {
          field: "region",
          title: "ElCascader",
          width: 200,
          editRender: { name: "ElCascader", props: { options: [] } }
        },
        {
          field: "date",
          title: "ElDatePicker",
          width: 200,
          editRender: {
            name: "ElDatePicker",
            props: { type: "date", format: "yyyy/MM/dd" }
          }
        },
        {
          field: "date1",
          title: "DateTimePicker",
          width: 220,
          editRender: {
            name: "ElDatePicker",
            props: { type: "datetime", format: "yyyy-MM-dd HH:mm:ss" }
          }
        },
        {
          field: "date5",
          title: "ElTimeSelect",
          width: 200,
          editRender: {
            name: "ElTimeSelect",
            props: {
              pickerOptions: { start: "08:30", step: "00:15", end: "18:30" }
            }
          }
        },
        {
          field: "flag",
          title: "ElSwitch",
          width: 100,
          editRender: { name: "ElSwitch", type: "visible" }
        },
        {
          field: "rate",
          title: "ElRate",
          width: 200,
          editRender: { name: "ElRate", type: "visible" }
        }
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
          address2: "地址 地址地址 地址0",
          age: 22,
          age1: "18",
          amount: 94667600,
          attr1: "",
          attr2: [],
          attr3: "",
          attr4: "",
          attr5: 0,
          bankCard: "6200000100000000",
          checked: false,
          checked1: true,
          checked2: true,
          checked3: true,
          checked4: true,
          checkedList: [],
          color: "rgba(255, 0, 0, 0.8)",
          content: "内容0",
          createTime: 1583486857919,
          date: 'Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)',
          date1: 'Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)',
          date2: "09:00:00",
          date3: "2020-03-06",
          date4: 'Fri Mar 06 2020 17:27:37 GMT+0800 (中国标准时间)',
          date5: "09:00",
          date6: null,
          date7: 'C',
          date8: 'C',
          date9: 'C',
          date10: 'C',
          date11: [],
          date12: "2020-03-06",
          date13: "2020-03-06",
          flag: true,
          flag1: "Y",
          flag2: "N",
          id: 1000000,
          img: "static/other/img2.gif",
          img1: "static/other/img2.gif",
          info: {},
          key: "home.label.key0",
          language: "zh_CN",
          list: [],
          loading: false,
          name: "HH0",
          nickname: "杨杨0",
          num: "0",
          num1: "0",
          num2: "0.0",
          num3: "0.0",
          num4: "0.00",
          num5: "0.00",
          num6: "0",
          num7: "1.39784",
          rate: 2,
          rate1: "2",
          region: [19,199,1773],
          role: "前端",
          role1: "",
          sex: "1",
          sex1: ['1'],
          sex2: "1",
          sex3: 1,
          sex4: 1,
          sex5: "1",
          sex6: 1,
          slider: 40,
          state: "value:Washington",
          text: "0 -> 杨蔡杜李吕徐胡赵蒋嬴孙马钱,徐HbaedcUrxsvGz",
          time: 1583487217919,
          updateTime: 1583486857919,
          _XID: "row_1",
        }
      ];
      this.loading = false;
    }, 500);
    this.findSexList();
    this.findRegionList();
    this.findSexGroupList();
  },
  methods: {
    saveEvent () {
      const { insertRecords, removeRecords, updateRecords } = this.$refs.xGrid.getRecordset()
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        this.$alert(`insertRecords=${insertRecords.length}; removeRecords=${removeRecords.length}; updateRecords=${updateRecords.length}`)
      } else {
        this.$alert('数据未改动！')
      }
    },
    insertEvent () {
      const xGrid = this.$refs.xGrid
      const record = {
        role: '',
        age: 18,
        sex1: [],
        region: [],
        flag: false,
        rate: 2
      }
      xGrid.insert(record).then(({ row }) => xGrid.setActiveRow(row))
    },
    findSexList() {
      this.tableColumn[5].editRender.options = [{label: "", spell: "", value: "", value2: null, val: ""},{label: "男", spell: "nan", value: "1", value2: 1, val: "x"},{label: "女", spell: "nv", value: "0", value2: 0, val: "o"}];
      this.tableColumn[6].editRender.options = [{label: "", spell: "", value: "", value2: null, val: ""},{label: "男", spell: "nan", value: "1", value2: 1, val: "x"},{label: "女", spell: "nv", value: "0", value2: 0, val: "o"}];
    },
    findRegionList() {
      this.tableColumn[8].editRender.props.options = [
        {value: 1, label: "北京", children: [
          {
            children: [
                {value: 2, label: "北京市", children: [
                  {label: "东城区",value: 3},
                  {label: "西城区",value: 4}
                ]}
              ],
            label: "北京",
            value: 1
          }

        ]},
        {value: 21, label: "上海", children: []}
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
    nsertEvent() {
      let xGrid = this.$refs.xGrid;
      let record = {
        role: "",
        age: 18,
        sex1: [],
        region: [],
        flag: false,
        rate: 2
      };
      xGrid.insert(record).then(({ row }) => xGrid.setActiveRow(row));
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
}</style>
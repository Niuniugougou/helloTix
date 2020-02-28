<template>
  <div class="workshopTreeWrapper">
		<el-button round @click="addFirstNode" size="small" style="margin-bottom:10px;">新增一级节点</el-button>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="data.show">{{node.label}}</span>
				<span v-else><el-input v-model="editData" @blur="setEditData(node,data)" ref="editNode" :key="data.id"></el-input></span>
        <span>
					<el-button type="text" size="mini" @click="() => edit(node, data)">编辑</el-button>
          <el-button type="text" size="mini" @click="() => append(node, data)">新增</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
		<el-button round @click="saveTree" v-if="data.length>0" size="small" style="margin-top:10px;">保存</el-button>
  </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    const data = [];
    return {
			data: JSON.parse(JSON.stringify(data)),
			editData: ''
    };
	},
  methods: {
    append(node, data) {
			const newChild = { id: id++, label: "新增的节点", show: true, children: [] };
			if (!data.children) {
				this.$set(data, "children", []);
			}
			data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
		},
		edit(node, data) {
			data.show = !data.show;
			this.editData = data.label;
			this.$nextTick(() => {
				this.$refs.editNode.$refs.input.focus();
			})
		},
		setEditData(node, data) {
			data.label = this.editData;
			this.editData = '';
			data.show = !data.show;
		},
		addFirstNode() {
			this.data.push({id: ++id, label:"第一级节点", show: true, children: []})
		},
		saveTree() {
			window.console.log(this.data)
		}
  }
};
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
	.el-tree .el-input__inner {
		width: 200px;
		height: 24px;
		border: none;
	}
	.workshopTreeWrapper{
		background: #fff;
    padding: 20px;	
	}
</style>
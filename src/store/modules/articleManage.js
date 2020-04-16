import { articleManage } from '@/api/article_manage.js'
import { articleTypeManage } from "@/api/article_type_manage";
import { timeformat } from "@/components/tools/timeformat";
export default {
    namespaced: true,
    state: {
        dataList:[],  //数据列表
        total: 0,
        pageNum: 1,
        pageSize: 10,
        searchName: '',
        id:''
    },
    actions: {
        //获取数据列表
        async getDataListAsync(context, {that}) {
            const {pageSize, pageNum, searchName} = context.state;
            const data = {pageSize, pageNum, searchName};
            let res = await articleManage.getAllArticle(data);
            if (res.code != 200) { return that.$message.error(res.msg)};
            res.dataList.map(item => {
                if(item.state == '0') {
                    item.state = '正常'
                }else {
                    item.state = '未启用'
                }
            })
            let resType = await articleTypeManage.getAllArticleType(data);
            if (resType.code != 200) { return this.$message.error(resType.msg);}
            //类型过滤，由数字 => 汉字
            res.dataList.map(item => {
                for(let i = 0;i < resType.dataList.length;i++) {
                    if(item.type == resType.dataList[i].id) {
                        item.typeName = resType.dataList[i].type_name;
                    }
                }
            })
            res.dataList.map(item => {
                item.create_time = timeformat.timeformat(item.create_time);
            })
            context.state.dataList = res.dataList;
            context.state.total = res.total - 0;
        },
        //删除或启用
        async deleteOrStart(context,{that,state,id}) {
            let data = {
                state: state,
                id: id
            }
            let res = await articleManage.disableArticle(data);
            if (res.code != 200) { return that.$message.error(res.msg);}
            that.$message.success(res.message);
        }
    },
    mutations: {
        searchNameChange: (state, payload) => state.searchName = payload,
        currentChange: (state, payload) => state.pageNum = payload,
        sizeChange: (state, payload) => state.pageSize = payload,
    }
};
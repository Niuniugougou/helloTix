import { bannerManage } from '@/api/banner_manage.js'
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
            const data = {pageSize, pageNum, searchName}
            let res = await bannerManage.getAllBanner(data);
            if (res.code != 200) { return that.$message.error(res.msg)};
            res.dataList.map(item => {
                if(item.state == '0') {
                    item.state = '正常'
                }else {
                    item.state = '未启用'
                }
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
            let res = await bannerManage.disableBanner(data);
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
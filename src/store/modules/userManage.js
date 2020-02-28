import { userManage } from '@/api/user_manage.js';
import { timeformat } from "@/components/tools/timeformat";
export default {
    namespaced: true,
    state: {
        userList:[],  //数据列表
        total: 0,
        pageNum: 1,
        pageSize: 10,
        userName: '',
        permissionList:[],
        oneRolePermissionList:[],
        id:''
    },
    actions: {
        //获取数据列表
        async getDataListAsync(context, {that}) {
            const {pageSize, pageNum, userName} = context.state;
            const data = {pageSize, pageNum, userName}
            let res = await userManage.getAllUsers(data);
            if (res.code != 200) { return that.$message.error("res.msg")};
            res.userList.map(item => {
                if(item.state == '0') {
                    item.state = '正常';
                }else {
                    item.state = '未启用'
                }
            })
            res.userList.map(item => {
                item.create_time = timeformat.timeformat(item.create_time);
            })
            context.state.userList = res.userList;
            context.state.total = res.total - 0;
        },
        //删除角色
        async deleteOrStart(context,{that,state,id}) {
            let data = {
                state: state,
                id: id
            }
            let res = await userManage.disableUser(data);
            if (res.code != 200) { return that.$http.handleError(res);}
            that.$message.success(res.message);
        }
    },
    mutations: {
        userNameChange: (state, payload) => state.userName = payload,
        currentChange: (state, payload) => state.pageNum = payload,
        sizeChange: (state, payload) => state.pageSize = payload,
    }
};
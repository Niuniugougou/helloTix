import request from '@/plugin/axios'
export const userManage = {
    disableUser(data) {
        return request({
            url: '/user/deleteorstart',
            method: 'post',
            data
        })
    },
    getAllUsers(data) {
        return request({
            url: '/user/getalluser',
            method: 'post',
            data
        })
    }
}
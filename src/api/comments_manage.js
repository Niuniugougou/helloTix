import request from '@/plugin/axios'
export const commentsManage = {
    disableComments(data) {
        return request({
            url: '/comments/deleteorstart',
            method: 'post',
            data
        })
    },
    getAllComments(data) {
        return request({
            url: '/comments/getallcomments',
            method: 'post',
            data
        })
    },
    commentsSave(data) {
        return request({
            url: '/comments/save',
            method: 'post',
            data
        })
    },
}
import request from '@/plugin/axios'
export const articleManage = {
    disableArticle(data) {
        return request({
            url: '/article/deleteorstart',
            method: 'post',
            data
        })
    },
    getAllArticle(data) {
        return request({
            url: '/article/getallarticle',
            method: 'post',
            data
        })
    },
    articleSave(data) {
        return request({
            url: '/article/save',
            method: 'post',
            data
        })
    },
    articleUpdate(data) {
        return request({
            url: '/article/update',
            method: 'post',
            data
        })
    }
}
import request from '@/plugin/axios'
export const articleTypeManage = {
    disableArticleType(data) {
        return request({
            url: '/articletype/deleteorstarttype',
            method: 'post',
            data
        })
    },
    getAllArticleType(data) {
        return request({
            url: '/articletype/getallarticletype',
            method: 'post',
            data
        })
    },
    articleTypeSave(data) {
        return request({
            url: '/articletype/savetype',
            method: 'post',
            data
        })
    },
    articleTypeUpdate(data) {
        return request({
            url: '/articletype/updatetype',
            method: 'post',
            data
        })
    }
}
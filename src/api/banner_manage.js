import request from '@/plugin/axios'
export const bannerManage = {
    getAllBanner(data) {
        return request({
            url: '/banner/getallbanner',
            method: 'post',
            data
        })
    },
    disableBanner(data) {
        return request({
            url: '/banner/deleteorstart',
            method: 'post',
            data
        })
    },
    bannerSave(data) {
        return request({
            url: '/banner/save',
            method: 'post',
            data
        })
    },
    bannerUpdate(data) {
        return request({
            url: '/banner/update',
            method: 'post',
            data
        })
    },
}
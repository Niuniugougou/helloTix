import request from '@/plugin/axios'
export const CrawlerAPI = {
    saveCrawlerArticle(data) {
        return request({
            url: '/crawler/articleCrawler',
            method: 'post',
            data
        })
    }
}
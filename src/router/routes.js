import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
          path: '/admin/workbench',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '工作台' }
      },
      {
          path: '/admin/user',
          component: resolve => require(['../components/webs/UserManage.vue'], resolve),
          meta: { title: '用户管理' }
      },
      {
        path: '/admin/messages',
        component: resolve => require(['../components/webs/Tabs.vue'], resolve),
        meta: { title: '消息中心' }
      },
      {
        path: '/admin/markdown',
        component: resolve => require(['../components/webs/Markdown.vue'], resolve),
        meta: { title: 'markDown' }
      },
      {
        path: '/admin/edit',
        component: resolve => require(['../components/webs/VueEditor.vue'], resolve),
        meta: { title: '富文本' }
      },
      {
        path: '/admin/articlemanage',
        component: resolve => require(['../components/webs/ArticleManage.vue'], resolve),
        meta: { title: '文章管理' }
      },
      {
        path: '/admin/articletypemanage',
        component: resolve => require(['../components/webs/ArticleTypeManage.vue'], resolve),
        meta: { title: '文章类型管理' }
      },
      {
        path: '/admin/banner',
        component: resolve => require(['../components/webs/BannerManage.vue'], resolve),
        meta: { title: '首页轮播' }
      },
      {
        path: '/admin/vue-cropper',
        component: resolve => require(['../components/custom-module/vue-cropper.vue'], resolve),
        meta: { title: '图片裁剪' }
      },
      {
        path: '/admin/commentsmanage',
        component: resolve => require(['../components/webs/CommentsManage.vue'], resolve),
        meta: { title: '评论管理' }
      },
      {
        path: '/admin/articleCrawler',
        component: resolve => require(['../components/webs/ArticleCrawler.vue'], resolve),
        meta: { title: '文章类型' }
      },
      {
        path: '/admin/imgsCrawler',
        component: resolve => require(['../components/webs/ImgsCrawler.vue'], resolve),
        meta: { title: '图片类型' }
      },
      {
        path: '/admin/progressBar',
        component: resolve => require(['../components/webs/progressBar/progressBar.vue'], resolve),
        meta: { title: '不一样的进度条' }
      },
      {
        path: '/admin/editTable',
        component: resolve => require(['../components/webs/editTable/editTable.vue'], resolve),
        meta: { title: '可编辑table' }
      },
      {
        path: '/admin/editTree',
        component: resolve => require(['../components/webs/editTree/editTree.vue'], resolve),
        meta: { title: '可编辑Tree' }
      },
      {
        path: '/admin/process',
        component: resolve => require(['../components/webs/process/process.vue'], resolve),
        meta: { title: '可拖拽流程图' }
      },
      {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
      },
      {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: { title: '403' }
      },

      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true
        },
        component: _import('demo/page1')
      },

      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]

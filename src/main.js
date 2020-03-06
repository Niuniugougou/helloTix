// Vue
import Vue from 'vue'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'

import './assets/css/icon.css';

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'

import { GetMenus } from '@/api/allactions'
//联级菜单插件
import EleMultiCascader from "ele-multi-cascader"
Vue.use(EleMultiCascader);

//工作台折线图
import VeLine from 'v-charts/lib/line.common.js'
Vue.component(VeLine.name, VeLine)

import VeHistogram from 'v-charts/lib/histogram.common.js'
Vue.component(VeHistogram.name, VeHistogram)

import 'view-design/dist/styles/iview.css'
import { Table,Button,Upload,Modal,Progress,Icon} from 'view-design';
Vue.component('Table', Table);
Vue.component('Button', Button);
Vue.component('Upload', Upload);
Vue.component('Modal', Modal);
Vue.component('Progress', Progress);
Vue.component('Icon', Icon);

//为了解决重启后第一次请求菜单报错问题
import util from '@/libs/util.js'

// 核心插件
Vue.use(d2Admin)

import './directives.js'

import axios from 'axios';
Vue.prototype.$http = axios;

//多功能表格插件
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

new Vue({
  router,
  store,
  i18n,
  data: function() {
    return {
      menuAsidesAll:[],
      searchMenu: []
    }
  },
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    // this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    // this.$store.commit('d2admin/menu/asideSet', menuAside)

    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      GetMenus().then((res) =>{
        this.renrenMenuToD2AdminMenu(res.children)
        this.$store.commit('d2admin/menu/asideSet', this.menuAsidesAll)
      })
    }


  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')

    // // 初始化菜单搜索功能
    // this.$store.commit('d2admin/search/init', this.menuAsidesAll)
  },
  methods : {
    renrenMenuToD2AdminMenu (menuArray,routeNameDict) {
      const transform = menu => ({
        ...menu.children.length > 0 ? { children: menu.children.map(e => transform(e)) } : {},
        id: menu.id,
        icon: menu.icon,
        title: menu.name,
        name: menu.name,
        path: menu.url
      })
      // console.log(menuArray.map(e => transform(e)))
      this.menuAsidesAll = menuArray.map(e => transform(e))
      return menuArray.map(e => transform(e))
    },

  }
}).$mount('#app')

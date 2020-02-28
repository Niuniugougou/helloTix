import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import userManage from "./modules/userManage"
import articleManage from "./modules/articleManage";
import articleTypeManage from "./modules/articleTypeManage";
import bannerManage from "./modules/bannerManage";
import commentsManage from "./modules/commentsManage";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin,
    userManage,
    articleManage,
    articleTypeManage,
    bannerManage,
    commentsManage
  }
})

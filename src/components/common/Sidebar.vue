<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.children.length != 0 ">
          <el-submenu index="item.url" :key="item.id">
            <template slot="title">
              <!-- <i class="el-icon-lx-file"></i> -->
              <strong v-if="collapse">{{item.name}}</strong>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children.length != 0" index="subItem.url" :key="subItem.id">
                <template slot="title">{{ subItem.name }}</template>
                <template v-for="subItem2 in subItem.children">
                  <el-submenu
                    v-if="subItem2.children.length != 0"
                    :index="subItem2.url"
                    :key="subItem2.id"
                  >
                    <template slot="title">{{ subItem2.name }}</template>
                    <el-menu-item
                      v-for="(threeItem,i) in subItem2.children"
                      :key="i"
                      :index="threeItem.url"
                    >{{ threeItem.name }}</el-menu-item>
                  </el-submenu>
                  <el-menu-item v-else :index="subItem2.url" :key="subItem2.id">{{ subItem2.name }}</el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item v-else :index="subItem.url" :key="subItem.id">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url" :key="item.id" v-if="item.children">
            <!-- <i class="el-icon-lx-file"></i> -->
            <strong v-if="collapse">{{item.name}}</strong>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  inject: ["reload"],
  data() {
    return {
      collapse: false,
      peopleOwnRole: [],
      result: [],
      items: [
        // {
        //   icon: "el-icon-lx-home",
        //   index: "dashboard",
        //   title: "工作台",
        //   isShow: false
        // },
        // {
        //   icon: "el-icon-lx-cascades",
        //   index: "table",
        //   title: "用户管理",
        //   isShow: false
        // },
        // // {
        // //   icon: "el-icon-lx-copy",
        // //   index: "tabs",
        // //   title: "推送消息",
        // //   isShow: false
        // // },
        // // {
        // //   icon: "el-icon-lx-favor",
        // //   index: "charts",
        // //   title: "schart图表",
        // //   isShow: false
        // // },
        // // {
        // //   icon: "el-icon-lx-warn",
        // //   index: "6",
        // //   title: "错误处理",
        // //   isShow: false,
        // //   subs: [
        // //     {
        // //       index: "permission",
        // //       title: "权限测试"
        // //     },
        // //     {
        // //       index: "404",
        // //       title: "404页面"
        // //     }
        // //   ]
        // // },
        // {
        //   icon: "el-icon-lx-calendar",
        //   index: "3",
        //   title: "应用",
        //   isShow: false,
        //   subs: [
        //     {
        //       index: "zmxx",
        //       title: "政民信箱",
        //       isShow: false,
        //       subs: [
        //         {
        //           index: "transaction",
        //           title: "办理",
        //           isShow: false,
        //         },
        //         {
        //           index: "classify",
        //           title: "分类",
        //           isShow: false,
        //           subs: [
        //             {
        //               index: "purpose",
        //               title: "来信目的",
        //               isShow: false,
        //             },
        //             {
        //               index: "letterclassify",
        //               title: "内容分类",
        //               isShow: false,
        //             }
        //           ]
        //         },
        //         {
        //           index: "statistical",
        //           title: "统计",
        //           isShow: false,
        //         },
        //         {
        //           index: "config",
        //           title: "配置",
        //           isShow: false,
        //         }
        //       ]
        //     },
        //     {
        //       index: "zxft",
        //       title: "在线访谈",
        //       isShow: false,
        //     },
        //     {
        //       index: "wsdc",
        //       title: "网上调查",
        //       isShow: false,
        //     },
        //     {
        //       index: "yjzj",
        //       title: "意见征集",
        //       isShow: false,
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-setting",
        //   index: "System",
        //   title: "系统管理",
        //   isShow: false
        // }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    this.getTheStartData();

  },
  mounted: function() {

  },
  methods: {
    getTheStartData() {
      var _this = this;
      let response = _this.$axiosJsonData({
        method: "post",
        url: "/api-base/res/menu",
        headers: {
          'token': window.sessionStorage.getItem('token')
        }
      });

      response
        .then(function(res) {
          if (res.data.status === "success") {
            _this.peopleOwnRole = res.data.data[0].children;
            _this.items = _this.peopleOwnRole;
            // console.log(_this.peopleOwnRole);
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$message.error("会话失效，请重新登录。");
          _this.$router.push({ path: "/login" });
        });
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
.el-menu--collapse{
  width: 100px;
}
</style>

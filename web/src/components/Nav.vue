<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-03 23:29:57
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-26 14:21:40
 -->

<template>
  <div
    class="nav banSelect"
    :style="{background:opacity?'rgba(255,255,255,1)':'rgba(255,255,255,0.5)'}"
  >
    <div class="nav-container">
      <div class="left">
        <a class="logo">
          <h3>Chris`s Blog</h3>
          <el-avatar class="userface" :src="userInfo.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </a>
      </div>
      <div class="middle">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-list"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/">
            <i style="color:#00c091" class="iconfont iconshouye icon"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu class="el-submenus" index="/">
            <template slot="title">
              <i style="color:#02b5da" class="iconfont iconbiji icon"></i>
              <span>个人笔记</span>
            </template>
            <el-menu-item index="/">All</el-menu-item>
            <el-menu-item index="/">HTML5</el-menu-item>
            <el-menu-item index="/">CSS3</el-menu-item>
            <el-menu-item index="/">JS</el-menu-item>
            <el-submenu index="/">
              <template slot="title">ES6</template>
              <el-menu-item index="/">选项1</el-menu-item>
              <el-menu-item index="/">选项2</el-menu-item>
              <el-menu-item index="/">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/">
              <template slot="title">VUE</template>
              <el-menu-item index="/">选项1</el-menu-item>
              <el-menu-item index="/">选项2</el-menu-item>
              <el-menu-item index="/">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/">
            <i style="color:#eee0e5" class="iconfont iconzuopin icon"></i>
            <span>作品</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i style="color:#9bcd9e" class="iconfont iconguanyu icon"></i>
            <span>关于</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i style="color:#23c9ed" class="iconfont iconliuyan icon"></i>
            <span>留言</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-input class="input" placeholder="输入你感兴趣的吧" v-model="searchVal">
          <el-button @click="serach" slot="append" icon="el-icon-search" size="small"></el-button>
        </el-input>
        <el-button
          v-if="!token"
          plain
          style="margin-left:30px;"
          @click="showLogin"
          type="primary"
          icon="el-icon-s-promotion"
        >Login</el-button>
        <el-popover v-else placement="bottom" width="160" v-model="visible">
          <p style="margin-bottom:5px;">你要走了嘛 ? 主人~~</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="logout">确定</el-button>
          </div>
          <el-button
            plain
            style="margin-left:30px;"
            type="danger"
            icon="el-icon-lollipop"
            slot="reference"
          >Logout</el-button>
        </el-popover>
      </div>
    </div>
    <el-dialog :modal="false" title="登录" :visible.sync="isShowLogin" width="27%" top="25vh" center>
      <el-form :model="form" label-position="left" label-width="auto">
        <el-form-item label="账号">
          <el-input
            v-model="form.account"
            style="width: 295px;"
            placeholder="请输入账号"
            autocomplete="off"
            @keyup.enter.native="makeSureClick"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            show-password
            v-model="form.password"
            style="width: 295px;"
            placeholder="请输入密码"
            autocomplete="off"
            @keyup.enter.native="makeSureClick"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="success" @click="makeSureClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { postApi, getApi } from "@/utils/request";
import { getToken, removeToken } from "@/utils/auth";
import { mapState } from "vuex";
export default {
  name: "Nav",
  props: {
    opacity: {
      type: Boolean
    }
  },
  data() {
    return {
      activeIndex: "1",
      searchVal: "", //搜索框的值
      isShowLogin: false, // 是否显示登录框
      form: {
        account: "",
        password: ""
      },
      visible: false,
      isScroll: false
    };
  },
  watch: {
    /** 是否显示登录框 */
    isShowLogin(newvalue) {
      if (!newvalue) {
        this.form = {
          account: "",
          password: ""
        };
      }
    }
  },
  computed: {
    ...mapState("user", ["token", "userInfo"])
  },
  methods: {
    serach() {
      // this.getUserInfo();
    },
    handleSelect(e,path) {
      console.log(e,path);
    },
    showLogin() {
      this.isShowLogin = true;
    },
    cancelClick() {
      this.isShowLogin = false;
    },
    /** login */
    makeSureClick() {
      if (this.form.account == "") {
        this.$message.error("请输入账号");
        return;
      }
      if (this.form.password == "") {
        this.$message.error("请输入密码");
        return;
      }
      let params = this.form;
      postApi("/user/login", params).then(res => {
        this.isShowLogin = false;
        this.$message.success("登录成功");
        this.getUserInfo();
      });
    },
    getUserInfo() {
      let userId = getToken();
      getApi("/user/userInfo", {}).then(res => {
        this.$store.dispatch("user/RefreshUserInfo", res.data.userInfo);
      });
    },
    /** logout */
    logout() {
      this.visible = false;
      this.$store.dispatch("user/RefreshToken", null);
      removeToken();
    }
  },
  mounted() {
    if (this.token) {
      this.getUserInfo();
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  width: 100%;
  /* background: rgba(255, 255, 255, 0.5); */
  height: 50px;
  transition: 0.35s all ease-in-out;
}
.nav .nav-container {
  width: 1160px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.nav-container .left {
  width: fit-content;
  height: 100%;
}
.left .logo {
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
}
.logo .userface {
  margin-left: 6px;
}
.el-menu {
  background: transparent !important;
  border: none !important;
}
.el-menu-list {
  padding: 0 50px;
}
.el-menu-list > .el-menu-item {
  height: 50px;
  line-height: 50px;
}
.right {
  display: flex;
  align-items: center;
}
.icon {
  margin-right: 5px;
}
</style>

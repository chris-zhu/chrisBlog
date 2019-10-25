<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-03 23:29:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 22:20:11
 -->

<template>
  <div class="nav">
    <div class="nav-container">
      <div class="left">
        <a class="logo">
          <h3>Chris`s Blog</h3>
          <el-avatar class="userface" :src="face"></el-avatar>
        </a>
      </div>
      <div class="middle">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-list"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <i style="color:#00c091" class="iconfont iconshouye icon"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu class="el-submenus" index="2">
            <template slot="title">
              <i style="color:#02b5da" class="iconfont iconbiji icon"></i>
              <span>个人笔记</span>
            </template>
            <el-menu-item index="2-0">All</el-menu-item>
            <el-menu-item index="2-1">HTML5</el-menu-item>
            <el-menu-item index="2-2">CSS3</el-menu-item>
            <el-menu-item index="2-3">JS</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">ES6</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="2-5">
              <template slot="title">VUE</template>
              <el-menu-item index="2-5-1">选项1</el-menu-item>
              <el-menu-item index="2-5-2">选项2</el-menu-item>
              <el-menu-item index="2-3-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">
            <i style="color:#eee0e5" class="iconfont iconzuopin icon"></i>
            <span>作品</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i style="color:#9bcd9e" class="iconfont iconguanyu icon"></i>
            <span>关于</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i style="color:#23c9ed" class="iconfont iconliuyan icon"></i>
            <span>留言</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-input class="input" placeholder="输入你感兴趣的吧" v-model="searchVal">
          <el-button slot="append" icon="el-icon-search" size="small"></el-button>
        </el-input>
        <el-button
          plain
          style="margin-left:30px;"
          @click="showLogin"
          type="primary"
          icon="el-icon-s-promotion"
        >Login</el-button>
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
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            show-password
            v-model="form.password"
            style="width: 295px;"
            placeholder="请输入密码"
            autocomplete="off"
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
import { postApi } from "../utils/request";
export default {
  data() {
    return {
      face:
        "https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/preview.gif?sign=d0190b8fb7453c99b957f47819acf883&t=1570179961",
      activeIndex: "1",
      searchVal: "", //搜索框的值
      isShowLogin: false,
      form: {
        account: "",
        password: ""
      }
    };
  },
  watch: {
    isShowLogin(newvalue) {
      if (!newvalue) {
        this.form = {
          account: "",
          password: ""
        };
      }
    }
  },
  methods: {
    handleSelect() {},
    showLogin() {
      this.isShowLogin = true;
    },
    cancelClick() {
      this.isShowLogin = false;
    },
    makeSureClick() {
      if (this.form.account == '') {
        this.$message.error("请输入账号");
        return;
      }
      if (this.form.password == '') {
        this.$message.error("请输入密码");
        return;
      }
      let params = this.form;
      postApi("/user/login", params).then(res => {
        console.log(res);
        this.isShowLogin = false;
        this.$message.success("登录成功");
      });
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  height: 50px;
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

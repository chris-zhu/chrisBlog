<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 17:29:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-05 10:03:39
 -->
<template>
  <div>
    <!-- 头部个人信息 -->
    <div
      v-show="token"
      class="header banSelect"
      :style="'background-image:url(' + userInfo.topBg + ');'"
    >
      <div class="user">
        <el-popover placement="top-start" width="100" trigger="hover" content="这个人很帅·~~">
          <div slot="reference" class="h-avatar">
            <el-avatar :size="60" :src="userInfo.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
          </div>
        </el-popover>
        <div class="userInfo">
          <span class="name">{{userInfo.name}}</span>
          <div class="autograph">
            <input type="text" v-model="userInfo.sign" />
          </div>
        </div>
      </div>
      <div @click="isShowSkin = true" title="更换皮肤" class="space-theme-trigger"></div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <el-row :gutter="20">
        <!-- 最热文章 -->
        <el-col :span="17">
          <section class="banSelect hotArcticle">
            <i class="iconfont iconhot"></i> 最热文章
          </section>
          <div class="articleList">
            <Article v-for="i in 6" :key="i" />
          </div>
        </el-col>
        <!-- 个人简介 -->
        <el-col :span="7">
          <section class="my-web">
            <h3 class="banSelect web-desc">本站简介</h3>
            <section class="web-info">本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介本站简介</section>
          </section>
        </el-col>
      </el-row>
    </div>

    <!-- 换肤 -->
    <div class="skin_content" :style="{'bottom':isShowSkin?'0px':'-580px'}">
      <Skin @close="closeSkin" @changeBg="userInfo.topBg = $event"></Skin>
    </div>
  </div>
</template>

<script>
import Skin from "@/components/Skin";
import Article from "@/components/Article";
import { mapState } from "vuex";
import { postApi, getApi } from "@/utils/request";
import { getToken, removeToken } from "@/utils/auth";
export default {
  name: "home",
  components: {
    Skin,
    Article
  },
  data() {
    return {
      userface: "../../assets/images/preview.gif",
      autograph: "console.log('人怂花朵')",
      isShowSkin: false
    };
  },
  methods: {
    closeSkin(flag) {
      this.isShowSkin = flag;
      this.getUserInfo();
    },
    getUserInfo() {
      let userId = getToken();
      getApi("/user/userInfo", {}).then(res => {
        this.$store.dispatch("user/RefreshUserInfo", res.data.userInfo);
      });
    },
    changeSkin() {
      this.showSkin = true;
    },
    loadSkinList() {}
  },
  computed: {
    ...mapState("user", ["token", "userInfo"])
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  /* background: url("../../assets/images/main_top_bg1.png") center center; */
  position: relative;
}
.header .user {
  width: 100%;
  height: 84px;
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  padding-left: 20px;
}
.user .h-avatar {
  /* position: absolute; */
  width: 64px;
  height: 64px;
  border: 2px solid hsla(0, 0%, 100%, 0.4);
  border-radius: 52px;
  overflow: hidden;
}
.h-avatar img {
  width: 64px;
  height: 64px;
  background: #fff;
  border-radius: 48px;
}
.userInfo {
  margin-left: 20px;
}
.userInfo .name {
  display: inline-block;
  margin: 10px 5px 0 0;
  font-weight: 700;
  line-height: 18px;
  font-size: 18px;
  vertical-align: middle;
  color: #fff;
}
.userInfo .autograph {
  margin-top: 8px;
}
.autograph input {
  background: transparent;
  border-radius: 4px;
  border: none;
  box-shadow: none;
  color: #d6dee4;
  font-size: 12px;
  font-family: Microsoft Yahei;
  line-height: 26px;
  height: 26px;
  margin-left: -5px;
  padding: 0 5px;
  position: relative;
  top: -1px;
  width: 730px;
}
.autograph input:hover {
  background: hsla(0, 0%, 100%, 0.2);
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.5);
}
.autograph input:focus {
  background: #fff;
  box-shadow: inset 0 2px 4px rgba(35, 54, 86, 0.3);
  color: #6d757a;
  outline: none;
  /* border: none; */
}
.like {
  margin-left: 65px;
  line-height: 84px;
  font-size: 18px;
  cursor: pointer;
  /* color: #00a1d6; */
}
.space-theme-trigger {
  background-image: url("../../assets/images/theme-trigger-new.png");
  background-position: 0 0;
  border-radius: 0 4px 0 0;
  cursor: pointer;
  width: 58px;
  height: 49px;
  transition: opacity 0.2s ease;
  position: absolute;
  top: 0;
  right: 0;
  vertical-align: middle;
  background-repeat: no-repeat;
}
.space-theme-trigger:hover {
  background-position: -522px 0;
}
.skin_content {
  width: 100vw;
  position: fixed;
  left: 0;
  transition: 0.4s all ease-in-out;
}

/* 内容区域 */
.content {
  overflow: hidden;
  margin: 10px 0;
}
.articleList {
  width: 100%;
  border-radius: 4px;
}
/* .grid-content {
  height: 50px;
  background: #fee0e0;
} */
.my-web {
  width: 100%;
  border-radius: 4px;
  background-color: #f0f9eb;
  color: #67c23a;
}
.my-web .web-desc {
  position: relative;
  font-weight: 400;
  padding: 8px 16px;
  font-size: 16px;
  /* color: #e6a23c; */
  border-bottom: 1px solid;
}
.web-desc::before {
  content: "";
  display: block;
  width: 20px;
  height: 2px;
  background: #97d6fd;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 90px;
  animation: 6s runBefore infinite;
}
.web-desc::after {
  content: "";
  display: block;
  width: 20px;
  height: 2px;
  background: #92bdfe;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  animation: 6s runAfter infinite;
}
@keyframes runBefore {
  0% {
    left: 90px;
  }
  50% {
    left: 294px;
  }
  100% {
    left: 90px;
  }
}
@keyframes runAfter {
  0% {
    right: 10px;
  }
  50% {
    right: 214px;
  }
  100% {
    right: 10px;
  }
}
.my-web .web-info {
  padding: 5px 10px;
  font-size: 14px;
  /* color: #e6a23c; */
}
.hotArcticle {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #fdf6ec;
  color: #e6a23c;
  margin-bottom: 10px;
}
</style>

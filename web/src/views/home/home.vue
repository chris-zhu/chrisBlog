<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 17:29:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-25 20:09:41
 -->
<template>
  <div>
    <div class="header">
      <div class="user">
        <el-popover placement="top-start" width="100" trigger="hover" content="这个人很帅·~~">
          <div slot="reference" class="h-avatar">
            <img src="../../assets/images/preview.gif" alt />
          </div>
        </el-popover>
        <!-- <div class="h-avatar">
          <img src="../../assets/images/preview.gif" alt />
        </div>-->
        <div class="userInfo">
          <span class="name">Chris</span>
          <div class="autograph">
            <input type="text" v-model="autograph" />
          </div>
        </div>
      </div>
      <div @click="isShowSkin = true" title="更换皮肤" class="space-theme-trigger"></div>
    </div>
    <div class="skin_content">
      <Skin v-show="isShowSkin" @close="isShowSkin = $event"></Skin>
    </div>
  </div>
</template>

<script>
import Skin from "../../components/Skin";
export default {
  name: "home",
  data() {
    return {
      userface: "../../assets/images/preview.gif",
      autograph: "console.log('人怂花朵')",
      isShowSkin: false
    };
  },
  methods: {
    changeSkin() {
      this.showSkin = true;
      console.log("换肤");
    },
    loadSkinList() {}
  },
  created() {},

  mounted() {},
  components: {
    Skin
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 200px;
  background: url("../../assets/images/main_top_bg1.png") center center;
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
  bottom: 0;
  left: 0;
}
</style>

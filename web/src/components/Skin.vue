<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 09:49:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-31 20:31:44
 -->
/** 皮肤组件 */
<template>
  <div>
    <div class="skin-box">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-skin"
        mode="horizontal"
        @select="handleSelect"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">头图</el-menu-item>
        <el-menu-item index="2">主题</el-menu-item>
        <span @click="closeSkin" class="close">
          <i style="color: azure;" class="el-icon-close"></i>
        </span>
      </el-menu>
      <div class="skinCon">
        <div class="skins">
          <ul class="bgList-inner clear banSelect">
            <li
              v-for="(item,i) in bgList"
              :key="item._id"
              class="toutu-item"
              :class="{'active' : bgActive == i}"
              @click.stop="bgActive = i"
              :style="'background-image:url(' + item.l_img + ');'"
            >
              <div class="toutu-detail">
                <div class="toutu-meta">
                  <div class="toutu-title">{{item.product_name}}</div>
                  <div class="toutu-price">免费</div>
                  <div @click.stop="testUse(i)" class="toutu-action">
                    <span class="toutu-btn use">使用</span>
                  </div>
                </div>
              </div>
              <span v-show="bgActive == i" class="tou-selected"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApi } from "@/utils/request";
export default {
  name: "Skin",
  data() {
    return {
      activeIndex: "1", // 导航
      bgList: [], // 所有背景图
      bgActive: -1 //
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
    },
    closeSkin() {
      this.$emit("close", false);
    },
    testUse(i) {
      let topBg = this.bgList[i].l_img;
      getApi("/user/updateUserInfo", { topBg }).then(res => {
        this.closeSkin()
      });
    },
    loadAllTopBg() {
      getApi("/topbg/list", {}).then(res => {
        this.bgList = res.data.data;
      });
    }
  },
  created() {},
  mounted() {
    this.loadAllTopBg();
  },
  watch: {
    bgActive(index) {
      this.$emit("changeBg", this.bgList[index].l_img);
    }
  }
};
</script>
<style lang="scss" scoped>
.skin-box {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  // height: 500px;
}
.el-menu-skin {
  position: relative;
  width: 1160px;
  margin: 0 auto;
  border: none;
}
.el-menu-skin li {
  border: none !important;
  padding: 0 50px;
}
.el-menu-skin li:hover {
  background: #f56c6c !important;
}
.el-menu-skin li.is-active {
  background: rgba(0, 0, 0, 0.7) !important;
}
.close {
  position: absolute;
  right: 0;
  top: 12px;
  font-size: 26px;
  cursor: pointer;
  outline: none;
}
.skinCon {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  height: 330px;
  overflow-y: auto;
}

.skinCon::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.skinCon::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #f56c6c;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.skinCon::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.skinCon .skins {
  width: 1160px;
  padding: 20px 0 0 30px;
  margin: 0 auto;
}
.toutu-item.active {
  border-color: #fff;
}
.toutu-item {
  border: 3px solid #555;
  border-radius: 12px;
  cursor: pointer;
  float: left;
  width: 345px;
  height: 96px;
  position: relative;
  margin: 0 25px 20px 0;
  background-size: cover;
  background-position: 50%;
  transition: all 0.3s ease-in-out;
}
.tou-selected {
  position: absolute;
}
.toutu-item:hover {
  z-index: 3;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.toutu-item:hover .toutu-detail {
  left: -3px;
  // opacity: 1;
  z-index: 10;
}
.toutu-item.active .toutu-detail {
  border-color: #fff;
}
.toutu-detail {
  background-repeat: no-repeat;
  border: 3px solid #555;
  border-radius: 12px;
  // opacity: 0;
  transition: opacity 0.2s ease;
  overflow: hidden;
  position: absolute;
  top: -3px;
  left: -9999px;
  width: 100%;
  box-sizing: content-box;
}
.toutu-meta {
  background: #333;
  line-height: 1em;
  margin-top: 100px;
  padding: 10px;
  position: relative;
}
.toutu-title {
  color: #fff;
  margin-bottom: 10px;
  font-size: 14px;
}
.toutu-price {
  color: #ccd0d7;
  font-size: 13px;
}
.toutu-action {
  position: absolute;
  bottom: 20px;
  right: 10px;
}
.toutu-btn.use {
  background: #00a1d6;
}
.toutu-btn {
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  line-height: 24px;
  /* margin-left: 7px; */
  width: 54px;
  font-size: 12px;
  color: #fff;
}
.toutu-item .tou-selected {
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/space/asserts/icons.png);
  background-position: -642px -650px;
  content: "";
  position: absolute;
  width: 45px;
  height: 45px;
  top: -3px;
  right: 0;
}

/*
// .grid-content {
//   border: 3px solid #555;
//   border-radius: 12px;
//   cursor: pointer;
//   float: left;
//   width: 353px;
//   height: 90px;
//   position: relative;
//   // margin: 0 25px 20px 0;
//   background-size: cover;
//   background-position: 50%;
//   transition: all 0.3s ease-in-out;
// }
// .row-bg {
//   padding: 10px 0;
//   background-color: #f9fafc;
// }
// .grid-content:hover .img-detail {
//   opacity: 1 !important;
//   display: block !important;
// }
// .grid-content:hover {
//   border-bottom-left-radius: 0 !important;
//   border-bottom-right-radius: 0 !important;
// }
// .img-detail {
//   background-repeat: no-repeat;
//   border: 3px solid #555;
//   border-radius: 12px;
//   opacity: 0;
//   display: none;
//   transition: all 0.3s ease-in-out;
//   overflow: hidden;
//   position: absolute;
//   top: -3px;
//   left: -3px;
//   width: 100%;
//   box-sizing: content-box;
//   z-index: 999;
// }
// .img-detail .img-meta {
//   background: #333;
//   line-height: 1em;
//   margin-top: 87px;
//   padding: 10px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
// .img-meta .imgInfo {
//   display: flex;
//   flex-direction: column;
// }
// .imgInfo .img-title {
//   color: #fff;
//   font-size: 14px;
// }
// .imgInfo .img-desc {
//   color: #fff;
//   font-size: 12px;
//   margin-top: 5px;
// }*/
</style>

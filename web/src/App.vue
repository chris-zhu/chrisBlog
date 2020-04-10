<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 16:56:39
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-26 14:01:49
 -->
<template>
  <div id="app">
    <vue-scroll ref="refScroller" :ops="ops" @handle-scroll="handleScroll">
      <!-- <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi particles"
      ></vue-particles>-->
      <el-container class="z2">
        <el-header height="50px">
          <Nav :opacity="nav_opacity" />
        </el-header>
        <el-main class="content">
          <router-view />
        </el-main>
        <el-footer class="footer">这是我的页脚，暂未设定内容</el-footer>
      </el-container>
    </vue-scroll>
    <Toolbar bottom="50px" right="50px">
      <Backtop v-show="showBackTopBtn" @click="backTop" />
    </Toolbar>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import Toolbar from "@/components/utils/Toolbar";
import Backtop from "@/components/utils/Backtop";
export default {
  components: {
    Nav,
    Toolbar,
    Backtop
  },
  data() {
    return {
      nav_opacity: false,
      showBackTopBtn: false,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: true, //是否只有滚动的时候才显示滚动条
          background: "#e6a23c",
          size: "6px",
          minSize: 0.3,
          opacity: 1
        }
      }
    };
  },
  methods: {
    handleScroll(vertical, horizontal, nativeEvent) {
      this.nav_opacity = vertical.scrollTop >= 100;
      this.showBackTopBtn = vertical.scrollTop >= 200;
    },
    backTop() {
      let scroller = this.$refs.refScroller; // scroller的ref
      scroller.scrollTo({ y: 0 }, 500, "easeInOutQuad");
    }
  },
  mounted() {}
};
</script>
<style scoped>
#app {
  height: 100vh;
}
.content {
  width: 1160px;
  margin: 0 auto;
  padding: 0 !important;
}
.particles {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
}
.z2 {
  z-index: 2;
}
.footer{
  text-align: center;
  line-height: 60px;
}
</style>

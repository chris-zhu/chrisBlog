<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 16:56:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-05 10:51:52
 -->
<template>
  <div id="app">
    <!-- <vue-scroll :ops="ops"> -->
      <vue-particles
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
      ></vue-particles>
      <el-container class="z2">
        <el-header height="50px">
          <Nav :opacity="nav_opacity" />
        </el-header>
        <el-main class="content">
          <router-view />
        </el-main>
        <el-footer class="content">Footer</el-footer>
      </el-container>
    <!-- </vue-scroll> -->
  </div>
</template>
<script>
import Nav from "./components/Nav";
export default {
  components: {
    Nav
  },
  data() {
    return {
      nav_opacity: false,
      // ops: {
      //   vuescroll: {},
      //   scrollPanel: {},
      //   rail: {
      //     keepShow: true
      //   },
      //   bar: {
      //     hoverStyle: true,
      //     onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
      //     background: "red"
      //   }
      // }
    };
  },
  methods: {
    scroll() {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.nav_opacity = scroll != 0;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  }
};
</script>
<style scoped>
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
}
.z2 {
  z-index: 2;
}
</style>

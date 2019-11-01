<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 16:56:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-01 09:47:23
 -->
<template>
  <div id="app">
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
      >
      </vue-particles>
    <el-container>
      <el-header height="50px">
        <Nav />
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer class="content">Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import Nav from "./components/Nav";
export default {
  components: {
    Nav
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.content {
  width: 1160px;
  margin: 0 auto;
  padding: 0 !important;
}
.particles{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>

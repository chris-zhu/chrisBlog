<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-21 16:56:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-21 22:00:19
 -->
<template>
  <div id="app">
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
  }
};
</script>
<style lang="scss">
.content{
  width: 1160px;
  margin: 0 auto;
  padding: 0 !important;
}
</style>

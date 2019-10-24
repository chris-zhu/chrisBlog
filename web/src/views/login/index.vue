<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-24 13:52:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-24 15:47:38
 -->
<template>
  <div>
    <el-input v-model="account"></el-input>
    <el-input v-model="password"></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
import { getApi, postApi } from "../../utils/request";
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      postApi("/login", {
        account: this.account,
        password: this.password
      }).then(res => {
        console.log(res);
      });
    }
  },
  created() {},

  mounted() {}
};
</script>
<style scoped>
</style>

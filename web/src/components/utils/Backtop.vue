<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-14 11:08:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-14 11:41:55
 -->
<template>
  <div class="backtop" @click="$emit('click')">
    <i class="el-icon-top i"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},

  mounted() {}
};
</script>
<style scoped>
.backtop {
  width: 40px;
  height: 40px;
  background-color: #e86256;
  color: #fff;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 50%;
  transition: 0.35s all ease-in-out;
}
.backtop:hover {
  opacity: 1;
  cursor: pointer;
  border-radius: 0;
}
.i {
  margin-top: 4px;
}
</style>

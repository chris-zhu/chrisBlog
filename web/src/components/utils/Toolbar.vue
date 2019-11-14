<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-14 10:45:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-14 12:02:20
 -->
<template>
  <div class="toolbars" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      style: {}
    };
  },
  methods: {},
  created() {},
  mounted() {
    this.style = { ...this.$attrs };
  }
};
</script>
<style scoped>
.toolbars {
  position: fixed;
  display: flex;
  flex-direction: column;
}
.tool {
  margin-top: 10px;
}
</style>

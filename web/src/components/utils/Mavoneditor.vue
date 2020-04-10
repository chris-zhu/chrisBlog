<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-07 21:15:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-11 10:14:06
 -->
<template>
  <div>
    <mavon-editor v-model="content" @change="editorChange" @save="editorChange" />
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {};
  },
  methods: {
    editorChange() {
      this.$emit("change", this.content);
    }
  },
  created() {},

  mounted() {}
};
</script>
<style scoped>
</style>

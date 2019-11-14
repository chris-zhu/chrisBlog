<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-01 11:29:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-13 15:55:42
 -->
<template>
  <div>
    <el-card class="box-card">
      <div class="article">
        <div class="imgBox">
          <el-image class="banSelect art-img" :src="article.cover" fit="cover" alt />
        </div>
        <div class="content">
          <h3>
            <el-link @click="goToDetail" class="title" type="info">{{article.title}}</el-link>
          </h3>
          <div class="tags banSelect">
            <el-tag
              size="small"
              class="tag"
              :type="tagTypes[Math.floor(Math.random() * 5)]"
              :key="tag"
              v-for="tag in article.tags"
            >{{tag}}</el-tag>
          </div>
          <section class="desc">
            <span class="desc-span">{{article.desc}}</span>
          </section>
          <section class="tools">
            <section class="toolList">
              <section class="tool">
                <i style="color:#409EFF;" class="iconfont iconsend-clock"></i>
                <span class="txt">{{ article.date | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </section>
              <section class="tool">
                <i style="color:#E6A23C;font-size:18px;" class="iconfont iconliulanliang"></i>
                <span class="txt">{{article.views}}</span>
              </section>
              <section class="tool">
                <i style="color: #F56C6C;" class="iconfont iconhua"></i>
                <span class="txt">{{article.likes}}</span>
              </section>
              <section class="tool">
                <i class="iconfont iconliuyan1"></i>
                <span class="txt">{{article.comments.length}}</span>
              </section>
            </section>
            <el-link @click="goToDetail" title="去瞧点儿乐子吧~~" style="margin-right:15px;">
              查看全文
              <i class="el-icon-d-arrow-right"></i>
            </el-link>
          </section>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object
    }
  },
  data() {
    return {
      tagTypes: ["", "success", "info", "warning", "danger"]
    };
  },
  methods: {
    goToDetail() {
      this.$router.push("/details/" + this.article._id);
    }
  },
  created() {},

  mounted() {}
};
</script>
<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 10px;
}
.box-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box-card:hover .imgBox .art-img {
  transform: scale(1.3);
}
.article {
  display: flex;
  width: 100%;
}
.article .imgBox {
  width: 300px;
  height: 200px;
  overflow: hidden;
}
.imgBox .art-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ease-in-out 0.5s;
}
.article .content {
  /* cursor: pointer; */
  position: relative;
  flex: 1;
  /* height: 100%; */
  padding-left: 10px;
}
.content .title {
  font-size: 20px;
  line-height: 1.5;
}
.content .tags {
  padding: 8px 0;
}
.tags .tag {
  margin-right: 5px;
}
.content .desc {
  width: 100%;
  height: 103px;
}
.desc .desc-span {
  font-size: 13px;
  color: #5e6d82;
  line-height: 1.6em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
.tools {
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tools .toolList {
  display: flex;
  align-items: center;
}
.toolList .tool {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.tool .iconfont {
  font-size: 16px;
  margin-right: 4px;
}
.tool .txt {
  font-size: 14px;
  color: #606266;
}
</style>

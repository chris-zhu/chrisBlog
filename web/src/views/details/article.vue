<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-13 15:35:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-14 17:53:50
 -->
<template>
  <div>
    <div class="contents">
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="page">
            <header class="header">
              <h1 class="title">{{article.title}}</h1>
              <section class="infos" v-if="article.author">
                <el-avatar :size="50" :src="article.author.avatar"></el-avatar>
                <div class="userinfo">
                  <span class="username">{{article.author.name}}</span>
                  <div class="btns">
                    <section class="btn">
                      <i style="color:#409EFF;" class="iconfont i iconsend-clock"></i>
                      <span class="txt">{{ article.date | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
                    </section>
                    <section class="btn">
                      <i style="color:#E6A23C;font-size:18px;" class="iconfont i iconliulanliang"></i>
                      <span class="txt">{{article.views}}</span>
                    </section>
                    <section class="btn">
                      <i style="color: #F56C6C;" class="iconfont i iconhua"></i>
                      <span class="txt">{{article.likes}}</span>
                    </section>
                    <!-- <el-link icon="el-icon-chat-dot-square">{{article.comments.length}}</el-link> -->
                    <section class="btn" style="cursor:pointer;">
                      <i class="iconfont i iconliuyan1"></i>
                      <span class="txt">{{article.comments.length}}</span>
                    </section>
                  </div>
                </div>
              </section>
            </header>
            <article v-html="article.content" class="arcContent"></article>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getApi } from "@/utils/request";
import marked from "marked";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import "highlight.js/styles/github.css";
import "@/assets/css/markdown.scss";
import "highlight.js/styles/vs2015.css";
export default {
  data() {
    return {
      articleId: "",
      article: {}
    };
  },
  methods: {
    viewUp() {
      getApi("/article/viewsUp", {
        articleId: this.articleId
      }).then(res => {
        this.article = res.data;
        if (this.article) this.article.content = marked(this.article.content);
      });
    },
    loadDetailArticle() {
      getApi("/article/detail", {
        articleId: this.articleId
      }).then(res => {
        this.article = res.data;
        if (this.article) this.article.content = marked(this.article.content);
      });
    },
    init() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
    }
  },
  created() {
    this.articleId = this.$route.params._id;
  },

  mounted() {
    this.viewUp();
    this.init();
    // this.loadDetailArticle();
  }
};
</script>
<style scoped>
.header {
  padding-bottom: 20px;
  border-bottom: 1px dotted #eaecef;
}
.contents {
  overflow: hidden;
  margin-top: 10px;
}
.right {
  width: 100%;
  height: 300px;
  background-color: bisque;
}
.page {
  border-radius: 5px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
}
.title {
  font-size: 28px;
  font-weight: 550;
  word-break: break-word;
  color: #404040;
  text-rendering: optimizelegibility;
  margin-top: 0;
  margin-bottom: 0.5em;
}
.infos {
  display: flex;
}
.userinfo {
  margin-left: 20px;
}
.userinfo .btns {
  margin-top: 8px;
  display: flex;
}
.btns .btn {
  margin-right: 20px;
}
.btn .i {
  margin-right: 5px;
}
</style>

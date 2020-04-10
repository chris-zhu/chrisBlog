<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-06 14:05:27
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-26 14:57:44
 -->
<template>
  <div>
    <div class="release">
      <el-form ref="form" :rules="rules" :model="form" label-position="right" label-width="200px">
        <el-form-item label="标题" prop="title">
          <el-input
            ref="titleInput"
            v-model="form.title"
            clearable
            placeholder="请输入文章标题"
            style="width: 400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            style="width: 400px;"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入文章描述"
            clearable
            v-model="form.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-tag
            :type="tagTypes[Math.floor(Math.random() * 5)]"
            :key="tag"
            v-for="tag in form.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <!-- <el-input
            style="width: 100px;"
            class="input-new-tag"
            clearable
            v-if="isTagInput"
            v-model="newTagValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>-->

          <el-autocomplete
            style="width: 100px;"
            class="input-new-tag"
            v-model="newTagValue"
            clearable
            v-if="isTagInput"
            ref="saveTagInput"
            @select="selectTag"
            :fetch-suggestions="querySearch"
            @blur="blur"
            @keyup.enter.native="handleInputConfirm"
          ></el-autocomplete>
          <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="头图">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="外链" prop="outlink">
          <el-input v-model="form.outlink" clearable placeholder="请输入外链" style="width: 400px;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="内容">
          <div style="width:800px">
            <Editor v-model="detail" :isClear="isClear" @change="editorChange"></Editor>
          </div>
        </el-form-item>-->
        <el-form-item label="内容" prop="content">
          <div style="width:900px">
            <Mavoneditor :content="form.content" @change="editorChange" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('form')">发布</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Editor from "@/components/utils/Editor";
import Mavoneditor from "@/components/utils/Mavoneditor";
import { getApi, postApi } from "@/utils/request";
export default {
  name: "release",
  components: {
    // Editor,
    Mavoneditor
  },
  data() {
    let checkOutlink = (rule, value, callback) => {
      if (value) {
        let result = rule.reg.test(value);
        if (result) callback();
        else callback(new Error("链接输入错误~~·_·~~"));
      }
    };
    return {
      articleId: "",
      isClear: false,
      detail: "",
      isTagInput: false,
      newTagValue: "",
      tagTypes: ["", "success", "info", "warning", "danger"],
      form: {
        title: "",
        desc: "",
        tags: [],
        content: "",
        cover: "",
        outlink: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 24, message: "标题不超过24个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入文章描述", trigger: "blur" }],
        content: [{ required: true, message: "请输入文章内容" }],
        outlink: [
          {
            reg: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
            validator: checkOutlink,
            trigger: "blur"
          }
        ]
      },
      tagsArr: [
        { value: "ES6" },
        { value: "VUE" },
        { value: "Node" },
        { value: "HTML" },
        { value: "CSS" },
        { value: "JS" }
      ]
    };
  },
  methods: {
    /** 发布 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过
          let params = { ...this.form };
          if (this.articleId) params.articleId = this.articleId;
          let url = this.articleId ? "/article/update" : "/article/create";
          postApi(url, params).then(res => {
            this.$message({
              message: this.articleId ? "修改成功" : "发布成功···",
              type: "success"
            });
            setTimeout(() => {
              this.$router.replace("/");
            }, 1000);
          });
        } else {
          this.$message({
            type: "error",
            message: "是不是有什么填错了~ ~"
          });
          return false;
        }
      });
    },
    /** 重置 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /** 富文本 */
    editorChange(val) {
      this.form.content = val;
    },
    /** 关闭标签 */
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    /** 确认标签 */
    handleInputConfirm() {
      let newTagValue = this.newTagValue;
      if (newTagValue) {
        if (this.form.tags.indexOf(newTagValue) != -1) {
          this.$message({
            type: "warning",
            message: "标签已存在"
          });
          this.$refs.saveTagInput.$refs.input.focus();
          return;
        } else {
          this.form.tags.push(newTagValue);
          this.isTagInput = false;
          this.newTagValue = "";
        }
      } else {
        this.isTagInput = false;
        this.newTagValue = "";
      }
    },
    /** 显示tag输入框 */
    showTagInput() {
      this.isTagInput = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    /** tag搜索 */
    querySearch(queryString, cb) {
      let tagsArr = this.tagsArr;
      let results = queryString
        ? tagsArr.filter(tag => {
            return (
              tag.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
            );
          })
        : tagsArr;
      setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    /** tag 选择 */
    selectTag(item) {
      this.newTagValue = item.value;
      this.handleInputConfirm();
    },
    blur() {
      setTimeout(() => {
        this.handleInputConfirm();
      }, 300);
    },
    loadDetail() {
      getApi("/article/detail", {
        articleId: this.articleId
      }).then(res => {
        console.log(res.data);
        this.form = {
          title: res.data.title,
          desc: res.data.desc,
          tags: res.data.tags,
          content: res.data.content,
          cover: res.data.cover,
          outlink: res.data.outlink
        };
      });
    }
  },
  created() {
    this.articleId = this.$route.params.articleId || "";
    if (this.articleId) this.loadDetail();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.titleInput.focus();
    });
  }
};
</script>
<style scoped>
.release {
  width: 100%;
  margin: 10px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

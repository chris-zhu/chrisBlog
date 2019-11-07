<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-06 14:05:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-06 20:55:15
 -->
<template>
  <div>
    <div class="release">
      <el-form ref="form" :rules="rules" :model="form" label-position="right" label-width="200px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" clearable placeholder="请输入文章标题" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
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
          <el-input
            style="width: 100px;"
            class="input-new-tag"
            clearable
            v-if="isTagInput"
            v-model="newTagValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
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
        <el-form-item label="内容">
          <div style="width:800px">
            <Editor v-model="detail" :isClear="isClear" @change="editorChange"></Editor>
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
import Editor from "@/components/utils/Editor";
import { getApi, postApi } from "@/utils/request";
export default {
  name: "release",
  components: {
    Editor
  },
  data() {
    return {
      isClear: false,
      detail: "",
      isTagInput: false,
      newTagValue: "",
      tagTypes: ["", "success", "info", "warning", "danger"],
      form: {
        title: "",
        desc: "",
        tags: [],
        content: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 24, message: "标题不超过24个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入文章描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    /** 发布 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
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
    }
  },
  created() {},

  mounted() {}
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

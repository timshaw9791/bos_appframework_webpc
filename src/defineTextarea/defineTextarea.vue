<template>
  <div data-input-container="entity-input-container" :data-label="'内容'">
    <el-input :readonly="readonly" type="textarea" :value="value" v-bind="$attrs" v-on="$listeners"
              :autosize="{ minRows: minRows, maxRows: 15}" class="textarea"
              :placeholder="placeholder">
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'defineTextarea',
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    minRows: {
      type: Number,
      default: 4
    },
    maxRows: {
      type: Number,
      default: 15
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {
      type: String,
      default: ''
    },
  }
}
</script>

<style scoped>
.textarea {
  margin: 5px 0 10px 0;
  width: 668px;
  font-size: 15px;
}
</style>
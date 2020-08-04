<template>
  <div class="searchDiv">
    <el-input
      @change="search"
      :placeholder="placeholder"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-select v-model="selected" slot="prepend" class="input-with-select">
        <el-option v-for="(item,i) in optionList" :key="i" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="iconfont icon-sousuo" @click="search()"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "defineSearch",
  props: {
    placeholder: {
      type: String,
      default: "搜索内容",
    },
    value: String,
    select: String,
    optionList: {
      type: Array,
      return() {},
    },
  },
  data() {
    return {
      selected: this.optionList[0].label,
      xb: 0,
    };
  },
  methods: {
    search() {
      let mb = {};
      this.optionList.forEach((item) => {
        mb[item.value] = null;
      });
      if (this.selected == this.optionList[this.xb].label) {
        mb[this.optionList[this.xb].value] = this.value;
      } else {
        mb[this.selected] = this.value;
      }
      this.$emit("search",mb)
    },
  },
  created(){
    if(this.select != null){
      let i = 0
      this.selected = this.select
      console.log('se',this.selected);
      this.optionList.forEach(item => {
        if(item.label == this.select){
          this.xb = i
        }
        i++
      })
    }
  }
};
</script>

<style scoped>
.searchDiv {
  float: right;
  margin: 0 10px 0 0;
}
.input-with-select {
  width: 150px;
}
</style>
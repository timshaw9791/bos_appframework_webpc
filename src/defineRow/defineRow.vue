<template>
  <div class="main">
    <el-tag size="large">{{label}}</el-tag>
    <div class="databg"><span class="elrow">{{data}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'defineRow',
  props: {
    data: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped>
.main {
  margin: 6px;
  display: flex;
  width: 300px;
}
.elrow {
  font-size:15px;
  margin:0px 0 0 10px;
}
.databg {
  background-color: azure;
  padding-top: 5px;
}
</style>
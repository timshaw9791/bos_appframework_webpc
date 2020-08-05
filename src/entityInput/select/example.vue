<template>
  <div>
    这是一个测试

    <div>
      <base-button label="取消" @click="cancel" type="none"></base-button>
      <base-button label="确定" @click="selected"></base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'example',
  components: {},
  data() {
    return {
      select: {},
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    selected() { 
      this.$emit("select", { data: this.select, ref: "example" });
    },
  },
  mounted(){

  },
  created() {

  }
};
</script>

<style scoped>
.main {
  height: 200px;
  /* min-height: 100%; */
  width:500px;
  margin-bottom: -50px;
}
.container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.databg {
  display: block;
  background-color: azure;
  margin-left: 10px;
  font-size: 15px;
  height: 30px;
  padding-top: 5px;
}
</style>
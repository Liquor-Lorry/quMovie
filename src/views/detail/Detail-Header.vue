<template>
  <div class="title-bar">
    <div class="goBack" @click="goBack">
      <i class="iconfont icon-zuo"></i>
    </div>
    <div class="title">
      {{title}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.title-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 44px;
  background-color: #fff;
  box-shadow: 0px 0px 2px #aaa;
  .goBack {
    height: 30px;
    position: absolute;
    top: 12px;
    left: 5px;
    i {
      font-size: 20px;
    }
  }
  .title {
    font-size: 17px;
    line-height: 44px;
    width: 100vw;
    text-align: center;
  }
}
</style>

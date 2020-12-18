<template>
  <div id="app">
    <!-- 轮播 -->
    <div class="loop">轮播区</div>
    <!-- 导航栏 -->
    <film-header></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import filmHeader from './film/FilmHeader.vue'
export default {
  components: {
    filmHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.loop {
  width: 100%;
  height: 200px;
  background-color: red;
}
</style>

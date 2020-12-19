<template>
  <div id="app">
    <!-- 轮播 -->
    <film-swiper>
      <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
        <div :style=" {backgroundImage: 'url('+item+')'} "
              style="height:200px;background-size:cover">
        </div>
      </div>
    </film-swiper>
    <!-- 导航栏 -->
    <film-header></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import filmSwiper from './film/Film-Swiper.vue'
import filmHeader from './film/FilmHeader.vue'
export default {
  components: {
    filmHeader,
    filmSwiper
  },
  data () {
    return {
      imgList: [
          'https://static.maizuo.com/pc/v5/usr/movie/8b120475b6d5417659dc47d899492393.jpg?x-oss-process=image/quality,Q_70',
          'https://static.maizuo.com/pc/v5/usr/movie/4ca39e8bec04aadc337bc09ee25ed838.jpg?x-oss-process=image/quality,Q_70',
          'https://static.maizuo.com/pc/v5/usr/movie/423e9dece16c3c98d2f4314dcd40b701.jpg?x-oss-process=image/quality,Q_70'
        ]
    }
  }
}
</script>

<style>

</style>

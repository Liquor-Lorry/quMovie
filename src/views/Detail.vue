<template>
  <v-touch @swipeleft="onSwipeLeft">
    <div class="filmDetail" v-if="filmInfo">

      <detail-header v-top :title="filmInfo.name"></detail-header>

      <!-- 用背景图完成图片整体显示不被挤压 -->
      <div :style="{backgroundImage:'url('+filmInfo.poster+')'}"
            style="height:200px;background-size:cover;background-position:center;">
      </div>

      <div class="film-title">
        <span class="name">{{filmInfo.name}}</span>
        <span class="item">{{filmInfo.filmType.name}}</span>
      </div>
      <div class="text-color">{{filmInfo.category}}</div>
      <div class="text-color">{{filmInfo.premiereAt | dateFilter}}上映</div>
      <div class="text-color">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>

      <div class="film-synopsis text-color" :class="isShow ? '' : 'synopsis'">{{filmInfo.synopsis}}</div>
      <div style="text-align:center;">
        <i :class="isShow ? 'icon-zuo' : 'icon-you'" class="iconfont" @click="isShow=!isShow"></i>
      </div>

      <div class="actors">
        <div class="actor-name">
          <span>演职人员</span>
        </div>
        <detail-swiper :perslide="4" swiperclass="swiper-actors">
          <div class="swiper-slide" v-for="(item, index) in filmInfo.actors" :key="index">
            <img :src="item.avatarAddress" />
            <div style="text-align:center;">
              <div>{{item.name}}</div>
              <div>{{item.role}}</div>
            </div>
          </div>
        </detail-swiper>
      </div>

      <div class="film-photo">
        <div class="photo-name">
          <span>剧照</span>
          <span class="p-right">
            全部({{filmInfo.photos.length}})
            <i class="iconfont icon-you" style="font-size:13px;"></i>
          </span>
        </div>
        <detail-swiper :perslide="3" swiperclass="swiper-photos">
          <div class="swiper-slide" v-for="(item, index) in filmInfo.photos" :key="index">
            <div :style="{backgroundImage:'url('+item+')'}"
                  style="height:100px;background-size:cover;background-position:center;"
                  @click="handlePreview(index)">
            </div>
          </div>
        </detail-swiper>
      </div>

      <div class="goTicket">选座购票</div>
    </div>
  </v-touch>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import moment from 'moment'

import http from '@/util/http.js'
// https://m.maizuo.com/gateway?filmId=4836&k=2278549

import detailSwiper from './detail/Detail-Swiper.vue'
import detailHeader from './detail/Detail-Header.vue'

import { ImagePreview } from 'vant'

import VueTouch from 'vue-touch'
// 过滤器
Vue.filter('dateFilter', (date) => {
  // 日期处理函数 - moment.js
  return moment(date * 1000).format('YYYY-MM-DD')
})
// 自定义指令
Vue.directive('top', {
  inserted (el) {
    // console.log(el);
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > 50) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁方法
  unbind () {
    window.onscroll = null
  }
})
Vue.use(VueTouch, { name: 'v-touch' })
export default {
  components: {
    detailSwiper,
    detailHeader
  },
  data () {
    return {
      filmInfo: null,
      isShow: false
    }
  },
  mounted () {
    // 一进来隐藏tabbar
    // this.$store.commit("hide")
    this.hide()

    // console.log('利用获取到的id，请求ajax接口', this.$route.params.id)
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=9521267`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film);
      this.filmInfo = res.data.data.film
    })
  },
  beforeDestroy () {
    // 显示tabbar
    // this.$store.commit('show')
    this.show()
  },
  methods: {
    // ...{hide(){}, show(){}}
    ...mapMutations('TabbarModule', ['hide', 'show']),

    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    },
    onSwipeLeft () {
      // console.log('left');
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.filmDetail {
  .film-title {
    margin: 15px 0 7px 15px;
    .name {
      color: #191a1b;
      font-size: 18px;
      height: 24px;
      line-height: 24px;
      margin-right: 7px;
      vertical-align: middle;
    }
    .item {
      vertical-align: middle;
      font-size: 9px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
      display: inline-block;
    }
  }
  .text-color {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
    margin-left: 15px;
  }
  .film-synopsis {
    margin-top: 12px;
    width: 335px;
  }
  .actors,.film-photo {
    margin-top: 15px;
    border-top: 10px solid #f4f4f4;
    .actor-name,.photo-name {
      box-sizing: border-box;
      width: 100%;
      padding: 15px;
      span {
        font-size: 16px;
        text-align: left;
        color: #191a1b;
      }
      .p-right {
        margin-left: 245px;
        font-size: 13px;
        color: #797d82;
      }
    }
  }
  .goTicket {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
    z-index: 99;
  }
}

.synopsis {
  height: 50px;
  overflow: hidden;
}
</style>

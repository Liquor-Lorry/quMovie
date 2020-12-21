<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="影院"
                 @click-left="handleLeftClick()"
                 @click-right="handleRightClick()">
      <template #left>
        {{cityName}}<van-icon name="arrow-down" color="#000" />
      </template>
      <template #right>
        <van-icon name="search" size="22" color="#000" />
      </template>
    </van-nav-bar>

    <div class="cinema" :style="{height:height}">
      <van-list>
      <van-cell v-for="item in cinemaList" :key="item.cinemaId">
        <div>{{item.name}}</div>
        <div class="address">{{item.address}}</div>
      </van-cell>
    </van-list>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

import Vue from 'vue'
import { NavBar, Icon, List, Cell } from 'vant'

import { mapState, mapMutations, mapActions } from 'vuex'
Vue.use(NavBar).use(Icon).use(List).use(Cell)
export default {
  data () {
    return {
      height: 0
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId', 'cityName'])
  },
  mounted () {
    // 访问cityId，cityName

    // 获取可视高度
    this.height = document.documentElement.clientHeight - 100 + 'px'

    if (this.cinemaList.length === 0) {
      // vuex异步流程
      this.getCinemaList(this.cityId).then(res => {
        // 状态立即更改，但是dom异步渲染
        this.$nextTick(() => {
          new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      // console.log('缓存');

      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  },
  methods: {
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    ...mapActions('CinemaModule', ['getCinemaList']),

    handleLeftClick () {
      // 跳转之前清空cinemaList 清空之后长度为0就会进入异步请求数据
      this.clearCinemaList()

      this.$router.push('/city')
    },
    handleRightClick () {
      this.$router.push('/cinema/search')
    }
  }
}
</script>

<style scoped lang="scss">
  // li {
  //   padding: 5px;
  //   .address {
  //     font-size: 12px;
  //     color: #aaa;
  //   }
  // }
</style>

<style lang="scss" scoped>
.cinema {
  height: 300px;
  overflow: hidden;
  position: relative;//修正better-scroll滚动条位置
}
</style>

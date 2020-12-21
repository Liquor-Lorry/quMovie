<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false">
      <van-cell v-for="data in dataList" :key="data.filmId" @click="handleClick(data.filmId)">
        <img :src="data.poster" alt="">
        <h3>{{data.name}}</h3>
        <p>主演：{{data.actors | actorFilter}}</p>
        <p>{{data.nation}} | {{data.runtime}}分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import http from '@/util/http.js'
import Vue from 'vue'

import { List, Cell } from 'vant'

import { mapState } from 'vuex'
// 过滤器
Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join(' ')
})
Vue.use(List).use(Cell)
export default {
  data () {
    return {
      dataList: [],
      loading: false, // 是否正在加载中
      finished: false, // 是否已完成
      currentPage: 1, // 记录当前是第几页数据
      total: 0 // 总长度
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=136082`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.dataList = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      if (this.dataList.length === this.total && this.dataList.length !== 0) {
        this.finished = true
        return
      }

      // console.log('到底啦');
      this.currentPage++

      // 1.ajax请求页面数据
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.currentPage}&pageSize=10&type=1&k=136082`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data.data.films)
        // 2.合并新数据到旧数据
        this.dataList = [...this.dataList, ...res.data.data.films]

        // 3.设置this.loading=false
        this.loading = false
      })
    },
    handleClick (id) {
      // console.log(id);
      this.$router.push(`/detail/${id}`)// 编程式导航
    }
  }
}
</script>

<style scoped lang="scss">
.van-cell {
  overflow: hidden;
  padding: 10px;
  img {
    float: left;
    width: 100px;
    margin-right: 10px;
  }
  p {
    color: #797d82;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

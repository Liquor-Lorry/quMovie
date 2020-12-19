<template>
  <div id="app">
    <ul>
      <li v-for="data in dataList" :key="data.filmId" @click="handleClick(data.filmId)">
        <img :src="data.poster" alt="">
        <h3>{{data.name}}</h3>
        <p>主演：{{data.actors | actorFilter}}</p>
        <p>{{data.nation}} | {{data.runtime}}分钟</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter('actorFilter', (actors) => {
  if(actors === undefined) return "暂无主演"
  return actors.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      dataList: []
    }
  },
  mounted () {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=136082',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596502176387264316178433","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.dataList = res.data.data.films
    })
  },
  methods: {
    handleClick (id) {
      // console.log(id);
      this.$router.push(`/detail/${id}`)// 编程式导航
    }
  }
}
</script>

<style scoped lang="scss">
li {
  overflow: hidden;
  padding: 10px;
  img {
    float: left;
    width: 100px;
    margin-right: 10px;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

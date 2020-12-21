<template>
  <div>
    <van-index-bar :index-list="computedCityList" @change="handleChange">
      <div v-for="item in cityList" :key="item.type">
        <van-index-anchor :index="item.type" />
        <van-cell :title="data.name" v-for="(data, index) in item.list" :key="index"
                  @click="handleChangePage(data.name, data.cityId)"/>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import http from '@/util/http.js'

import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'

import { mapMutations } from 'vuex'

Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
Vue.use(Toast)
export default {
  data () {
    return {
      cityList: []
    }
  },
  mounted () {
    http({
      url: '/gateway?k=702823',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data);

      this.cityList = this.handleCity(res.data.data.cities)
    })
  },
  computed: {
    computedCityList () {
      return this.cityList.map(item => item.type)
    }
  },
  methods: {
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    handleCity (cities) {
      // console.log(cities);

      // 输入原始数据，输出目标数据   （数据改造）
      const wordArr = []// 建立空数组用来存放26个英文字母
      const newCityList = []// 收集目标数据
      for (let code = 65; code < 91; code++) {
        // console.log(String.fromCharCode(code));
        wordArr.push(String.fromCharCode(code))
        // console.log(wordArr);
      }
      wordArr.forEach(item => { // 遍历26个英文字母A-Z
        const list = cities.filter(val => {
          // 过滤出ciites数组里每个进来的数据的首字母大写
          return val.pinyin.substring(0, 1).toUpperCase() === item
        })
        // console.log(list);
        if (list.length > 0) {
          newCityList.push({
            type: item,
            list: list
          })
        }
      })

      // console.log(newCityList);
      return newCityList
    },
    handleChange (index) {
      Toast(index)
    },
    handleChangePage (name, cityId) {
      // 将cityId，cityName记录下来
      // this.$store.state.cityName = name

      // this.$store.commit("changeCityName", name)
      // this.$store.commit("changeCityId", cityId)
      this.changeCityName(name)
      this.changeCityId(cityId)

      this.$router.back()
    }
  }
}
</script>

<style>

</style>

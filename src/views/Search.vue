<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @cancel="handleCancel()"
    />
    <van-list>
      <van-cell v-for="item in computedCinemaList" :key="item.cinemaId">
        <div>{{item.name}}</div>
        <div class="address">{{item.address}}</div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, List, Cell } from 'vant'

import { mapState, mapActions } from 'vuex'

Vue.use(Search).use(List).use(Cell)
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId']),
    ...mapState('CinemaModule', ['cinemaList']),

    // 实现搜索的模糊查询
    computedCinemaList () {
      if (this.value === '') return []
      return this.cinemaList.filter(item => {
        // 全部转换成大写来匹配
        return item.name.toUpperCase().includes(this.value.toUpperCase()) ||
        item.address.toUpperCase().includes(this.value.toUpperCase())
      })
    }
  },
  mounted () {
    // 在这里可以通过前面的缓存直接拿到数据 不需要重新请求
    // console.log(this.$store.state.cinemaList);

    if (this.cinemaList.length === 0) {
      // vuex异步流程
      this.getCinemaList(this.cityId)
    } else {
      console.log('缓存')
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),

    handleCancel () {
      this.$router.replace('/cinema')
    }
  }
}
</script>

<style scoped lang="scss">
.van-search {
  width: 100vw;
  height: 54px;
  position: fixed;
  top: 0;
  z-index: 99;
}
.van-list {
  height: calc(100vh - 54px);
  position: absolute;
  top: 54px;
}
//   li {
//     padding: 5px;
//     .address {
//       font-size: 12px;
//       color: #aaa;
//     }
//   }
</style>

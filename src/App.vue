<template>
  <div id="app">
    <tabbar/>
    <router-view/>
  </div>
</template>

<script>
import tabbar from './components/Tabbar.vue'
import axios from 'axios'// https://m.maoyan.com/ajax/movieOnInfoList
export default {
  components: {
    tabbar
  },
  data () {
    return {

    }
  },
  created () {
    axios.get('/ajax/movieOnInfoList').then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>

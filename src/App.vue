<template>
  <div id="app">
    <tabbar/>
    <section>
      <router-view/>
    </section>
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
html, body {
  height: 100%;
}
li {
  list-style: none;
}

section {
  margin-bottom: 50px;
}
</style>

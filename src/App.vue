<template>
  <div id="app">
    <tabbar v-show="isTabbarShow"></tabbar>
    <section>
      <router-view/>
    </section>
  </div>
</template>

<script>
import tabbar from './components/Tabbar.vue'

import { mapState } from 'vuex'
export default {
  components: {
    tabbar
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('TabbarModule', ['isTabbarShow'])
  },
  mounted () {
    // console.log(mapState("TabbarModule", ["isTabbarShow"]));
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

* {
  touch-action: manipulation;
}
</style>

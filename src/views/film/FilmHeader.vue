<template>
  <div class="film-nav">
    <ul>
      <router-link to="/film/nowplaying" tag="li" active-class="active">正在热映</router-link>
      <router-link to="/film/commingsoon" tag="li" active-class="active">即将上映</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.film-nav {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
  ul {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    li {
      flex: 1;
    }
  }
}

.active {
  color: orange;
  border-bottom: 3px solid orange;
}
</style>

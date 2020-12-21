import http from '@/util/http.js'

const module = {
  namespaced: true, // 开启命名空间
  state: {
    cinemaList: []
  },
  mutations: {
    setCinemaList (state, data) {
      state.cinemaList = data
    },

    clearCinemaList (state) {
      state.cinemaList = []
    }
  },
  // 异步处理
  actions: {
    getCinemaList (store, cityId) {
      return http({ // 这里return出去 返回一个Promise对象
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=9302555`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        // console.log(res.data);
        store.commit('setCinemaList', res.data.data.cinemas)// 提交到mutation被监听
      })
    }
  }
}

export default module

const module = {
  namespaced: true, // 开启命名空间
  state: {
    isTabbarShow: true // 控制tabbar的显示与隐藏
  },
  mutations: {
    hide (state) {
      state.isTabbarShow = false
    },
    show (state) {
      state.isTabbarShow = true
    }
  }
}

export default module

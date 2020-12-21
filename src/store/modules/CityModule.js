const module = {
  namespaced: true, // 开启命名空间
  state: {
    cityId: '310100',
    cityName: '上海'
  },
  mutations: {
    changeCityName (state, name) {
      // console.log('1111');
      state.cityName = name
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    }
  }
}

export default module

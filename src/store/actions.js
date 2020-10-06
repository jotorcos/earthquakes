import API from '@/api'

export default {
  async fetchEarthquakesByDate({ commit }, payload) {
    const { dateStart, dateEnd } = payload
    const earthquakesData = await API.getEarthquakesByDate(dateStart, dateEnd)
    commit('SET_EARTHQUAKES', earthquakesData)
  }
}

export default {
  baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/',

  async getEarthquakesByDate(dateStart, dateEnd) {
    const response = await fetch(
      `${
        this.baseUrl
      }query?format=geojson&starttime=${dateStart.toISOString()}&endtime=${dateEnd.toISOString()}`
    )
    return await response.json()
  },
  async getEarthquakeById(id) {
    const response = await fetch(
      `${this.baseUrl}query?format=geojson&eventid=${id}`
    )
    return await response.json()
  }
}

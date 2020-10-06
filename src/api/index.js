export default {
  async fetchEarthquakesByDate(dateStart, dateEnd) {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateStart.toISOString()}&endtime=${dateEnd.toISOString()}`
    )
    return await response.json()
  },
  async fetchEarthquakeById(id) {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=${id}`
    )
    return await response.json()
  }
}

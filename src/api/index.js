export default {
  async getEarthquakesByDate(dateStart, dateEnd) {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateStart.toISOString()}&endtime=${dateEnd.toISOString()}`
    )
    return await response.json()
  },
  async getEarthquakeById(id) {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=${id}`
    )
    return await response.json()
  }
}
